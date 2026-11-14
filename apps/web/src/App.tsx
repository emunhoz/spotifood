import { Header } from '@monorepo/ui-components'
import styled from 'styled-components'
import Playlist from './features/playlists/Playlist'

const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 26px;
  margin: 0 auto;
`

function App () {
  return (
    <Main>
      <Header />
      <Playlist />
    </Main>
  )
}

export default App
