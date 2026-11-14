import { Header } from '@monorepo/ui-components'
import styled from 'styled-components'
import { FilterProvider } from './features/playlists/filter-context'
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
      <FilterProvider>
        <Playlist />
      </FilterProvider>
    </Main>
  )
}

export default App
