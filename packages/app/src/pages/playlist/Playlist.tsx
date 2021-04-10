import { useEffect, useState } from 'react'
import { SearchBar, PlaylistCard, Button } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import { useAuth } from '../../contexts/auth'
import { featuredPlaylist } from '../../services/spotify'
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
  const [data, setData] = useState<ResponseDataFromSpotifyPlaylist | any>({})
  const { signOut } = useAuth()

  useEffect(() => {
    getPlaylistData()
  }, [])

  async function getPlaylistData () {
    try {
      const { data } = await featuredPlaylist()
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

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
          <SearchBar onChange={console.log} placeholder='Nome da playlist...' />
          <div>
            <S.Filters onClick={() => setToogleFilter(!toggleFilter)}>
              Filtros
            </S.Filters>
            <S.FilterContent toogleFilter={toggleFilter}>
              <S.FilterWrapper>
                <S.CloseFilter onClick={() => setToogleFilter(!toggleFilter)}>
                  Fechar
                </S.CloseFilter>
                <div>
                  <select>
                    <option value=''>Locale</option>
                    <option value=''>Teste</option>
                    <option value=''>Teste</option>
                  </select>

                  <select>
                    <option value=''>País</option>
                    <option value=''>Teste</option>
                    <option value=''>Teste</option>
                  </select>

                  <input
                    type='datetime-local'
                    id='meeting-time'
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
          {data?.playlists?.items?.map(
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
      </S.Wrapper>
    </S.Main>
  )
}

export default Playlist
