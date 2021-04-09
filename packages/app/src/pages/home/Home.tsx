import { Button } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import SpotifyLogo from '../../images/spotify-logo.svg'
import { SPOTIFY_LOGIN_URL } from '../../services/spotify'
import * as S from './Home.style'

function Home () {
  function redirectToLogin () {
    try {
      return (window.location.href = SPOTIFY_LOGIN_URL)
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
      </S.Logo>
      <S.Wrapper>
        <S.MainText>
          <S.Title>Ei, temos uma novidade pra vc!</S.Title>
          <S.Divider />
          <S.Paragraph>
            Preparamos algumas playlists para você aproveitar com seu pedido :)
          </S.Paragraph>
        </S.MainText>
        <S.ImageWrapper></S.ImageWrapper>
      </S.Wrapper>
      <S.CallToAction>
        <S.SpotifyLogo
          src={SpotifyLogo}
          alt='Spotify logo'
          width='126'
          height='38'
        />
        <S.CallToActionText>
          Faça login com sua conta do spotify
        </S.CallToActionText>
        <Button onClick={() => redirectToLogin()}>Entrar</Button>
      </S.CallToAction>
    </S.Main>
  )
}

export default Home
