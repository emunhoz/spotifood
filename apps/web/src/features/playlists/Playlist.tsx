import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SearchBar, PlaylistCard, PlaylistCardSkeleton, EmptyState, Chip, ChipGroup, Button } from '@monorepo/ui-components'
import { usePlaylists } from './use-playlists'
import { usePlaylistFilters } from './use-playlist-filters'
import { usePlaylistDetail } from './use-playlist-detail'
import PlaylistDialog from './PlaylistDialog'
import { filterPlaylists, uniqueValues, facetCounts } from './filter-playlists'
import { OCCASIONS, occasionForHour, greetingForHour, describeSelection } from './time-of-day'
import { coverDataUrl, listenUrl } from './cover'
import * as S from './Playlist.style'

const SKELETON_COUNT = 8
const SEARCH_SHORTCUT = '/'
const TYPING_TARGETS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

// Chip rows render live during filter transitions (no snapshot cross-fade), so the
// ChipGroup indicator's own CSS slide is what you see instead of a ghosted copy
function liveRow (name: string): CSSProperties {
  return { viewTransitionName: name, viewTransitionClass: 'live' } as CSSProperties
}

function heroCover (isHero: boolean, id: string): CSSProperties {
  return (isHero ? { viewTransitionName: `cover-${id}`, viewTransitionClass: 'cover' } : {}) as CSSProperties
}

// The hero card and the dialog panel share one name: the card's surface grows into the panel
function heroShell (isHero: boolean): CSSProperties {
  return (isHero ? { viewTransitionName: 'playlist-dialog' } : {}) as CSSProperties
}

// Names that only make sense while filtering; detail transitions strip them so nothing floats above the backdrop
const FILTER_ONLY = { 'data-vt-filter': '' }

function isTypingTarget (target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (TYPING_TARGETS.has(target.tagName) || target.isContentEditable)
}

function Playlist () {
  const [hour] = useState(() => new Date().getHours())
  const searchInput = useRef<HTMLInputElement>(null)
  const filters = usePlaylistFilters()
  const detail = usePlaylistDetail()
  const playlistsState = usePlaylists()
  const suggestedOccasion = occasionForHour(hour)
  const { criteria } = filters

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('keydown', (event) => {
      if (event.key !== SEARCH_SHORTCUT || isTypingTarget(event.target)) return
      event.preventDefault()
      searchInput.current?.focus()
    }, { signal: controller.signal })
    return () => controller.abort()
  }, [])

  if (playlistsState.status === 'error') {
    return <EmptyState title='Could not load playlists' message='Check your connection and refresh the page.' />
  }

  const isLoading = playlistsState.status === 'loading'
  const playlists = isLoading ? [] : playlistsState.playlists
  const visiblePlaylists = filterPlaylists(playlists, criteria)
  const genres = uniqueValues(playlists, 'genre')
  const occasionCounts = facetCounts(playlists, criteria, 'occasion')
  const genreCounts = facetCounts(playlists, criteria, 'genre')
  const allOccasionsCount = [...occasionCounts.values()].reduce((sum, count) => sum + count, 0)
  const hasFilters = filters.query !== '' || criteria.genre !== '' || criteria.occasion !== ''
  const hasNoResults = !isLoading && visiblePlaylists.length === 0
  const openPlaylist = playlists.find(playlist => playlist.id === detail.openId) ?? null

  return (
    <S.Wrapper>
      <S.Hero>
        <S.Eyebrow>{greetingForHour(hour)}</S.Eyebrow>
        <S.Count aria-live='polite' {...FILTER_ONLY} style={{ viewTransitionName: 'playlist-count' } as CSSProperties}>
          {isLoading ? 'Finding playlists…' : describeSelection(visiblePlaylists.length, criteria.genre, criteria.occasion)}
        </S.Count>
        <S.Subline>Music to go with your food order.</S.Subline>
      </S.Hero>

      {/* Search and the meal row stay reachable while scrolling; genres scroll away to save height */}
      <S.Toolbar>
        <SearchBar
          ref={searchInput}
          onChange={(event) => filters.setQuery(event.target.value)}
          onClear={filters.clearSearch}
          value={filters.query}
          labelName='Search playlists'
          placeholder='Search playlists, people or dishes...'
          shortcutHint={SEARCH_SHORTCUT}
        />
        <ChipGroup label='Occasion' {...FILTER_ONLY} style={liveRow('occasion-row')}>
          <Chip
            active={criteria.occasion === ''}
            count={isLoading ? undefined : allOccasionsCount}
            onClick={filters.showAllOccasions}
          >
            All
          </Chip>
          {OCCASIONS.map(value => (
            <Chip
              key={value}
              active={criteria.occasion === value}
              suggested={value === suggestedOccasion}
              count={isLoading ? undefined : occasionCounts.get(value) ?? 0}
              onClick={() => filters.toggleOccasion(value)}
            >
              {value}
            </Chip>
          ))}
        </ChipGroup>
      </S.Toolbar>

      <S.Filters>
        <ChipGroup label='Genre' {...FILTER_ONLY} style={liveRow('genre-row')}>
          {genres.map(value => (
            <Chip
              key={value}
              active={criteria.genre === value}
              count={genreCounts.get(value) ?? 0}
              onClick={() => filters.toggleGenre(value)}
            >
              {value}
            </Chip>
          ))}
        </ChipGroup>
        {hasFilters && <S.ClearButton type='button' onClick={filters.clearAll}>Clear filters</S.ClearButton>}
      </S.Filters>

      <S.Grid aria-busy={isLoading}>
        {isLoading && Array.from({ length: SKELETON_COUNT }, (_, index) => <PlaylistCardSkeleton key={index} />)}
        {visiblePlaylists.map((playlist, index) => (
          <S.CardSlot key={playlist.id} {...FILTER_ONLY} style={{ viewTransitionName: `card-${playlist.id}` } as CSSProperties}>
            <PlaylistCard
              index={index}
              owner={playlist.owner}
              playlistName={playlist.name}
              link={listenUrl(playlist.name)}
              imgUrl={coverDataUrl(playlist)}
              minutes={playlist.minutes}
              pairsWith={playlist.pairsWith}
              onOpen={() => detail.open(playlist.id)}
              // Only the hero card names its cover, and only while the dialog does not show it:
              // one name per frame, and unnamed cards stay under the backdrop
              coverStyle={heroCover(playlist.id === detail.heroId && playlist.id !== detail.openId, playlist.id)}
              shellStyle={heroShell(playlist.id === detail.heroId && playlist.id !== detail.openId)}
            />
          </S.CardSlot>
        ))}
      </S.Grid>

      <PlaylistDialog playlist={openPlaylist} onClose={detail.close} />

      {hasNoResults && (
        <EmptyState
          title='No playlists found'
          message='Try another word or remove a filter.'
          action={<Button size='small' ghost onClick={filters.clearAll}>Clear filters</Button>}
        />
      )}
    </S.Wrapper>
  )
}

export default Playlist
