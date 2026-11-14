import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SearchBar, PlaylistCard, PlaylistCardSkeleton, EmptyState, Chip, Button } from '@monorepo/ui-components'
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

// view-transition-name must be unique per frame, so only the active chip carries it
function activeName (isActive: boolean, name: string): CSSProperties {
  return { viewTransitionName: isActive ? name : undefined } as CSSProperties
}

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
        <S.Count aria-live='polite' style={{ viewTransitionName: 'playlist-count' } as CSSProperties}>
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
        <S.ChipRow role='group' aria-label='Occasion'>
          <Chip
            active={criteria.occasion === ''}
            count={isLoading ? undefined : allOccasionsCount}
            onClick={filters.showAllOccasions}
            style={activeName(criteria.occasion === '', 'occasion-active')}
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
              style={activeName(criteria.occasion === value, 'occasion-active')}
            >
              {value}
            </Chip>
          ))}
        </S.ChipRow>
      </S.Toolbar>

      <S.Filters>
        <S.ChipRow role='group' aria-label='Genre'>
          {genres.map(value => (
            <Chip
              key={value}
              active={criteria.genre === value}
              count={genreCounts.get(value) ?? 0}
              onClick={() => filters.toggleGenre(value)}
              style={activeName(criteria.genre === value, 'genre-active')}
            >
              {value}
            </Chip>
          ))}
        </S.ChipRow>
        {hasFilters && <S.ClearButton type='button' onClick={filters.clearAll}>Clear filters</S.ClearButton>}
      </S.Filters>

      <S.Grid aria-busy={isLoading}>
        {isLoading && Array.from({ length: SKELETON_COUNT }, (_, index) => <PlaylistCardSkeleton key={index} />)}
        {visiblePlaylists.map((playlist, index) => (
          <S.CardSlot key={playlist.id} style={{ viewTransitionName: `card-${playlist.id}` } as CSSProperties}>
            <PlaylistCard
              index={index}
              owner={playlist.owner}
              playlistName={playlist.name}
              link={listenUrl(playlist.name)}
              imgUrl={coverDataUrl(playlist)}
              minutes={playlist.minutes}
              pairsWith={playlist.pairsWith}
              onOpen={() => detail.open(playlist.id)}
              // The open playlist's cover lives in the dialog; one name per frame or the transition aborts
              coverStyle={{ viewTransitionName: playlist.id === detail.openId ? undefined : `cover-${playlist.id}` } as CSSProperties}
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
