import { useEffect, useState } from 'react'
import { SearchBar, PlaylistCard, Button, Input, SelectInput, Label } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import CloseIcon from '../../images/close-icon.svg'
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
  const maxCalendarDate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  const [filterForm, setFilterForm] = useState({
    locale: '',
    country: '',
    dateTime: '',
    itemPerPage: '',
    pageNumber: ''
  })

  console.log(toggleFilter, 'toggleFilter')

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

  function handleToogleFilter (toggle: boolean) {
    if (!toggleFilter) document.body.style.overflow = 'hidden'
    if (toggleFilter) document.body.removeAttribute('style')

    return setToogleFilter(toggle)
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
            <S.LabelWrapper><Label value="Filtros" onClick={() => handleToogleFilter(!toggleFilter)} /></S.LabelWrapper>
            <S.FilterContent toogleFilter={toggleFilter}>
              <S.FilterWrapper>
                <S.CloseFilter onClick={() => handleToogleFilter(!toggleFilter)}>
                  <S.CloseIcon src={CloseIcon} alt="Fechar opções de filtros" /> Fechar
                </S.CloseFilter>
                {filterDataResponse && 
                <div>
                  <SelectInput label={filterDataResponse[0].name} value={filterForm.locale} onChange={(e) => setFilterForm({ ...filterForm, locale: e.target.value })}>
                    <option value="" disabled>Selecione um idioma da playlist desejada</option>
                    {filterDataResponse[0].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </SelectInput>

                  <SelectInput label={filterDataResponse[1].name}  value={filterForm.country} onChange={(e) => setFilterForm({ ...filterForm, country: e.target.value })}>
                    <option value="" disabled>Escolha o país de origem</option>
                    {filterDataResponse[1].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </SelectInput>

                  <Input
                    label={filterDataResponse[2].name} 
                    type='datetime-local'
                    value={filterForm.dateTime} onChange={(e) => setFilterForm({ ...filterForm, dateTime: e.target.value })}
                    min='2021-01-01T00:00'
                    max={maxCalendarDate}
                  />

                  <Input placeholder="Informe uma quantidade de playlist para visualizar" label={filterDataResponse[3].name} type='text' value={filterForm.itemPerPage} onChange={(e) => setFilterForm({ ...filterForm, itemPerPage: e.target.value })} />
                  <Input placeholder="Número de playlist por página" label={filterDataResponse[4].name} type='text' value={filterForm.pageNumber} onChange={(e) => setFilterForm({ ...filterForm, pageNumber: e.target.value })} />
                </div>}
                <S.FilterButtonWrapper><Button size="big">Aplicar</Button></S.FilterButtonWrapper>
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
