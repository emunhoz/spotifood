import { useState } from 'react'
import { SearchBar, PlaylistCard, Button } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import { useAuth } from '../../contexts/auth'
import * as S from './Playlist.style'

function Playlist () {
  const [toggleFilter, setToogleFilter] = useState(false)
  const { signOut } = useAuth()

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
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
          <PlaylistCard
            owner='Spotify'
            playlistName='Rain Sounds'
            link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
            imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
          />
        </S.PlayListWrapper>
      </S.Wrapper>
    </S.Main>
  )
}

export default Playlist
