import { render, screen, fireEvent } from '../../utils/test-utils'
import Home from './Home'
import { SPOTIFY_LOGIN_URL } from '../../services/spotify'

describe('[Page]: Home', () => {
  test('show main messages', () => {
    render(<Home />)
    const mainMessage = screen.getByRole('heading', {
      name: /ei, temos uma novidade pra vc!/i
    })
    const subMessage = screen.getByText(
      /preparamos algumas playlists para você aproveitar com seu pedido :\)/i
    )
    const spotifyMessage = screen.getByText(
      /faça login com sua conta do spotify/i
    )

    expect(mainMessage).toBeInTheDocument()
    expect(subMessage).toBeInTheDocument()
    expect(spotifyMessage).toBeInTheDocument()
  })

  test('redirect to spotify authentication page', () => {
    global.window = Object.create(window)
    const url = 'http://dummy.com'

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    })

    render(<Home />)

    const loginButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.click(loginButton)
    expect(window.location.href).toEqual(SPOTIFY_LOGIN_URL)
  })
})
