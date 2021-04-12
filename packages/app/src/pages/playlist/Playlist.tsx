import { useEffect, useState } from 'react'
import { SearchBar, PlaylistCard, Button } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import { useAuth } from '../../contexts/auth'
import { featuredPlaylist } from '../../services/spotify'
import { filterData } from '../../services/filters'
import * as S from './Playlist.style'

interface ResponseDataFromSpotifyPlaylist {
  data: {
    playlists: {
      items: object
    }
  }
}

function Playlist () {
  const [toggleFilter, setToogleFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<ResponseDataFromSpotifyPlaylist | any>()
  const [filterDataResponse, setFilterDataResponse] = useState<any>()
  const { signOut } = useAuth()

  useEffect(() => {
    getPlaylistData()
    getFilter()
  }, [])

  async function getFilter() {
    try {
      const { data } = await filterData()
      setFilterDataResponse(data?.filters)
    } catch (error) {
      console.error(error)
    }
  }

  async function getPlaylistData () {
    try {
      const { data } = await featuredPlaylist()
      setData(data?.playlists?.items)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredPlaylist = data?.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <S.Main>
      <S.Logo>
        <S.SpotifoodLogo
          src={SpotifoodLogo}
          alt='Spotifood logo'
          width='124'
          height='45'
        />
        <S.SignOutLink onClick={() => signOut()}>Sair</S.SignOutLink>
      </S.Logo>
      <S.Wrapper>
        <S.SearchWrapper>
          <SearchBar onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Nome da playlist...' />
          <div>
            <S.Filters style={{ display: 'none' }} onClick={() => setToogleFilter(!toggleFilter)}>
              Filtros
            </S.Filters>
            <S.FilterContent toogleFilter={toggleFilter}>
              <S.FilterWrapper>
                <S.CloseFilter onClick={() => setToogleFilter(!toggleFilter)}>
                  Fechar
                </S.CloseFilter>
                <div>
                  <select>
                    {filterDataResponse && filterDataResponse[0].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </select>

                  <select>
                    {filterDataResponse && filterDataResponse[1].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </select>

                  <input
                    type='datetime-local'
                    name='meeting-time'
                    value='2018-06-12T19:30'
                    min='2018-06-07T00:00'
                    max='2018-06-14T00:00'
                  />

                  <input type='text' value='20' />
                  <input type='text' value='0' />
                </div>
                <Button>Aplicar</Button>
              </S.FilterWrapper>
            </S.FilterContent>
          </div>
        </S.SearchWrapper>
        <S.PlayListWrapper>
          {filteredPlaylist && filteredPlaylist.map(
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
        {search && !filteredPlaylist?.length && <h2>Parece que não tem nada aqui =/</h2>}
      </S.Wrapper>
    </S.Main>
  )
}

export default Playlist
