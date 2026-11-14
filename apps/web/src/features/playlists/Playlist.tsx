import { useState, lazy, Suspense } from 'react'
import { SearchBar, PlaylistCard, Label, Loading, EmptyState, SideModal } from '@monorepo/ui-components'
import { useFilter, FILTER_LABELS, type FilterName } from './filter-context'
import { usePlaylists } from './use-playlists'
import { filterPlaylists, type Playlist as PlaylistItem } from './filter-playlists'
import { coverDataUrl, listenUrl } from './cover'
import * as S from './Playlist.style'

const FilterForm = lazy(() => import('./Filter'))

function Playlist () {
  const [search, setSearch] = useState('')
  const { filterForm, removeFilterByItem, handleToogleFilter, toggleFilter } = useFilter()
  const playlistsState = usePlaylists()

  if (playlistsState.status === 'loading') return <Loading />

  if (playlistsState.status === 'error') {
    return <EmptyState title='Could not load playlists' message='Check your connection and refresh the page.' />
  }

  const { playlists } = playlistsState
  const visiblePlaylists = filterPlaylists(playlists, { search, ...filterForm })
  const appliedFilters = (Object.entries(filterForm) as [FilterName, string][]).filter(([, value]) => value !== '')
  const hasNoResults = visiblePlaylists.length === 0

  return (
    <S.Wrapper>
      <S.SearchWrapper>
        <SearchBar onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search playlists...' />
        <S.LabelWrapper><Label value='Filters' onClick={() => handleToogleFilter(!toggleFilter)} /></S.LabelWrapper>
        <SideModal show={toggleFilter} close={() => handleToogleFilter(false)}>
          <Suspense fallback={<Loading />}>
            <FilterForm playlists={playlists} onCloseFilter={() => handleToogleFilter(false)} />
          </Suspense>
        </SideModal>
      </S.SearchWrapper>
      {appliedFilters.length > 0 && (
        <S.AppliedFilters>
          <S.AppliedFiltersTitle>Applied filters:</S.AppliedFiltersTitle>
          <S.AppliedFilterWrapper>
            {appliedFilters.map(([name, value]) => (
              <S.AppliedFilter key={name} type='button' aria-label={`Remove ${FILTER_LABELS[name]} filter`} onClick={() => removeFilterByItem(name)}>
                {FILTER_LABELS[name]}: <strong>{value}</strong>
              </S.AppliedFilter>
            ))}
          </S.AppliedFilterWrapper>
        </S.AppliedFilters>
      )}
      <S.PlayListWrapper>
        {visiblePlaylists.map((playlist: PlaylistItem) => (
          <PlaylistCard
            key={playlist.id}
            owner={playlist.owner}
            playlistName={playlist.name}
            link={listenUrl(playlist.name)}
            imgUrl={coverDataUrl(playlist.cover)}
          />
        ))}
      </S.PlayListWrapper>
      {hasNoResults && <EmptyState title='No playlists found' message='Try another word or remove a filter.' />}
    </S.Wrapper>
  )
}

export default Playlist
