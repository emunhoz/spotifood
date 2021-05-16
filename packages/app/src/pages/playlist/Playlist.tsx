import { useState, lazy } from 'react'
import { SearchBar, PlaylistCard, Label, Loading, EmptyState, SideModal } from '@monorepo/ui-components'
import objectWithValues from '../../helpers/object-with-values'
import encodeQueryData from '../../helpers/encode-query-data'
import { useFetch } from '../../hooks/use-fetch'
import { useFilter } from '../../contexts/filter'
import * as S from './Playlist.style'

const FilterForm = lazy(() => import('./forms/Filter'))

interface ResponseDataFromSpotifyPlaylist {
  playlists: {
    items: [{
      name: string
      id: string
      owner: { display_name: string }
      external_urls: { spotify: string }
      images: [key: { url: string }]
    }]
  }
}

function Playlist () {
  const [toggleFilter, setToogleFilter] = useState(false)
  const [search, setSearch] = useState('')
  const { filterForm } = useFilter()

  const params = objectWithValues(filterForm)
  const { data: playlistData, isValidating } = useFetch<ResponseDataFromSpotifyPlaylist>(`/browse/featured-playlists?${encodeQueryData(params)}`)
  
  if (isValidating) return <Loading />

  const filteredPlaylist = playlistData?.playlists.items?.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()))

  function handleToogleFilter (toggle: boolean) {
    if (!toggleFilter) document.body.style.overflow = 'hidden'
    if (toggleFilter) document.body.removeAttribute('style')

    return setToogleFilter(toggle)
  }

  return (
    <S.Wrapper>
      <S.SearchWrapper>
        <SearchBar onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Nome da playlist...' />
        <S.LabelWrapper><Label value="Filtros" onClick={() => handleToogleFilter(!toggleFilter)} /></S.LabelWrapper>
        <SideModal
          show={toggleFilter}
          close={() => handleToogleFilter(!toggleFilter)}
        >
          <FilterForm onCloseFilter={() => handleToogleFilter(false)}/>
        </SideModal>
      </S.SearchWrapper>
      <S.PlayListWrapper>
        {filteredPlaylist?.map(
          (playlist: {
            id: string
            owner: { display_name: string }
            name: string
            external_urls: { spotify: string }
            images: [key: { url: string }]
          }) => (
            <PlaylistCard
              key={playlist.id}
              owner={playlist.owner.display_name}
              playlistName={playlist.name}
              link={playlist.external_urls.spotify}
              imgUrl={playlist.images[0].url}
            />
          )
        )}
      </S.PlayListWrapper>
      {search && !filteredPlaylist?.length && <EmptyState title="Nenhuma playlist encontrada!" message="Que tal pesquisar por outra palavra?" />}
    </S.Wrapper>
  )
}

export default Playlist
