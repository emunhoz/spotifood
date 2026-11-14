import { useState, type CSSProperties } from 'react'
import { SearchBar, PlaylistCard, PlaylistCardSkeleton, EmptyState, Chip, Button } from '@monorepo/ui-components'
import { usePlaylists } from './use-playlists'
import { filterPlaylists, uniqueValues } from './filter-playlists'
import { OCCASIONS, occasionForHour, greetingForHour, describeSelection } from './time-of-day'
import { withViewTransition } from './with-view-transition'
import { coverDataUrl, listenUrl } from './cover'
import * as S from './Playlist.style'

const SKELETON_COUNT = 8
const ALL = ''

// view-transition-name must be unique per frame, so only the active chip carries it
function activeName (isActive: boolean, name: string): CSSProperties {
  return { viewTransitionName: isActive ? name : undefined } as CSSProperties
}

function Playlist () {
  const [hour] = useState(() => new Date().getHours())
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState(ALL)
  const [occasion, setOccasion] = useState(ALL)
  const playlistsState = usePlaylists()
  const suggestedOccasion = occasionForHour(hour)

  if (playlistsState.status === 'error') {
    return <EmptyState title='Could not load playlists' message='Check your connection and refresh the page.' />
  }

  const isLoading = playlistsState.status === 'loading'
  const playlists = isLoading ? [] : playlistsState.playlists
  const visiblePlaylists = filterPlaylists(playlists, { search, genre, occasion })
  const genres = uniqueValues(playlists, 'genre')
  const hasFilters = search !== '' || genre !== ALL || occasion !== ALL
  const hasNoResults = !isLoading && visiblePlaylists.length === 0

  const toggleOccasion = (value: string) => withViewTransition(() => setOccasion(current => current === value ? ALL : value))
  const toggleGenre = (value: string) => withViewTransition(() => setGenre(current => current === value ? ALL : value))
  const clearAll = () => withViewTransition(() => {
    setSearch('')
    setGenre(ALL)
    setOccasion(ALL)
  })

  return (
    <S.Wrapper>
      <S.Hero>
        <S.Eyebrow>{greetingForHour(hour)}</S.Eyebrow>
        <S.Count aria-live='polite' style={{ viewTransitionName: 'playlist-count' } as CSSProperties}>
          {isLoading ? 'Finding playlists…' : describeSelection(visiblePlaylists.length, genre, occasion)}
        </S.Count>
        <S.Subline>Music to go with your food order.</S.Subline>
      </S.Hero>

      <SearchBar
        onChange={(event) => {
          const { value } = event.target
          withViewTransition(() => setSearch(value))
        }}
        value={search}
        placeholder='Search playlists, people or dishes...'
      />

      <S.Filters>
        <S.ChipRow role='group' aria-label='Occasion'>
          <Chip active={occasion === ALL} onClick={() => withViewTransition(() => setOccasion(ALL))} style={activeName(occasion === ALL, 'occasion-active')}>
            All
          </Chip>
          {OCCASIONS.map(value => (
            <Chip
              key={value}
              active={occasion === value}
              suggested={value === suggestedOccasion}
              onClick={() => toggleOccasion(value)}
              style={activeName(occasion === value, 'occasion-active')}
            >
              {value}
            </Chip>
          ))}
        </S.ChipRow>
        <S.ChipRow role='group' aria-label='Genre'>
          {genres.map(value => (
            <Chip key={value} active={genre === value} onClick={() => toggleGenre(value)} style={activeName(genre === value, 'genre-active')}>
              {value}
            </Chip>
          ))}
        </S.ChipRow>
        {hasFilters && <S.ClearButton type='button' onClick={clearAll}>Clear filters</S.ClearButton>}
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
              imgUrl={coverDataUrl(playlist.cover)}
              minutes={playlist.minutes}
              pairsWith={playlist.pairsWith}
            />
          </S.CardSlot>
        ))}
      </S.Grid>

      {hasNoResults && (
        <EmptyState
          title='No playlists found'
          message='Try another word or remove a filter.'
          action={<Button size='small' ghost onClick={clearAll}>Clear filters</Button>}
        />
      )}
    </S.Wrapper>
  )
}

export default Playlist
