import { Button } from '@monorepo/ui-components'
import SpotifyLogo from '../../images/spotify-logo.svg'
import PeopleListeningMusic from '../../images/woman-listening-music.webp'
import { SPOTIFY_LOGIN_URL } from '../../services/spotify'
import * as S from './Home.style'

function Home () {
  function redirectToLogin () {
    return (window.location.href = SPOTIFY_LOGIN_URL)
  }

  return (
    <>
      <S.Wrapper>
        <S.MainText>
          <S.Title>Ei, temos uma novidade pra vc!</S.Title>
          <S.Divider />
          <S.Paragraph>
            Preparamos algumas playlists para você aproveitar com seu pedido :)
          </S.Paragraph>
        </S.MainText>
        <S.ImageWrapper>
          <S.ListenMusicImage
            src={PeopleListeningMusic}
            alt='Pessoa escutando música'
          />
        </S.ImageWrapper>
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
    </>
  )
}

export default Home
