import { SearchBar } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import { useAuth } from '../../contexts/auth'
import * as S from './Playlist.style'

function Playlist () {
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
        <span onClick={() => signOut()}>Sair</span>
      </S.Logo>
      <S.Wrapper>
        <S.SearchWrapper>
          <SearchBar onChange={console.log} placeholder='Nome da playlist...' />
          <div>
            <S.Filters>Filtros</S.Filters>
          </div>
        </S.SearchWrapper>
      </S.Wrapper>
    </S.Main>
  )
}

export default Playlist
