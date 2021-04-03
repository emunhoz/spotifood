import { Button } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import SpotifyLogo from '../../images/spotify-logo.svg'
import { SPOTIFY_LOGIN_URL } from '../../services/spotify'
import * as S from './Home.style'

function Home() {
  return (
    <S.Main>
      <S.Logo>
        <S.SpotifoodLogo src={SpotifoodLogo} alt="Spotifood logo" />
      </S.Logo>
      <S.Wrapper>
        <S.MainText>
          <S.Title>Ei, temos uma novidade pra vc!</S.Title>
          <S.Divider />
          <S.Paragraph>Preparamos algumas playlists para você aproveitar com seu pedido :)</S.Paragraph>
        </S.MainText>
        <S.ImageWrapper>
        </S.ImageWrapper>
      </S.Wrapper>
      <S.CallToAction>
        <S.SpotifyLogo src={SpotifyLogo} alt="Spotify logo" />
        <S.CallToActionText>Faça login com sua conta do spotify</S.CallToActionText>
        <Button onClick={() => window.location.href = SPOTIFY_LOGIN_URL}>Entrar</Button>
      </S.CallToAction>
    </S.Main>
  )
}

export default Home
