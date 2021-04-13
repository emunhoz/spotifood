import { useEffect, useState } from 'react'
import { SearchBar, PlaylistCard, Button, Input, SelectInput, Label, Loading } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import CloseIcon from '../../images/close-icon.svg'
import { useAuth } from '../../contexts/auth'
import { featuredPlaylist } from '../../services/spotify'
import { filterData } from '../../services/filters'
import objectWithValues from '../../helpers/object-with-values'
import toast, { Toaster } from 'react-hot-toast'
import * as S from './Playlist.style'

const notify = () => toast('Here is your toast.');

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { signOut } = useAuth()
  const maxCalendarDate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  const [filterForm, setFilterForm] = useState({
    locale: '',
    country: '',
    timestamp:  '',
    limit: '',
    offset: ''
  })

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
      const { data } = await featuredPlaylist({})
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

  async function applyFilterForm () {
    setIsLoading(true)
    try {
      const { data } = await featuredPlaylist(filterForm)
      setData(data?.playlists?.items)
      toast.success('Filtros aplicados!', { duration: 4000 })
    } catch (error) {
      toast.error('Algo deu errado com os filtros! Tente novamente', { duration: 4000 })
      console.error(error)
    } finally {
      setIsLoading(false)
      handleToogleFilter(false)
    }
  }

  const filteredPlaylist = data?.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()))
  let hasFilterParams = Object.entries(objectWithValues(filterForm)).length === 0

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
                    <option value="" disabled>Selecione um idioma</option>
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
                    onChange={(e) => setFilterForm({ ...filterForm, timestamp: new Date(e.target.value).toISOString() })}
                    min='2021-01-01T00:00'
                    max={maxCalendarDate}
                  />

                  <Input type="number" placeholder="Quantidade para visualizar na página" label={filterDataResponse[3].name} value={filterForm.limit} onChange={(e) => setFilterForm({ ...filterForm, limit: e.target.value })} />
                  <Input type="number" placeholder="Número de playlist por página" label={filterDataResponse[4].name} value={filterForm.offset} onChange={(e) => setFilterForm({ ...filterForm, offset: e.target.value })} />
                </div>}
                <S.FilterButtonWrapper>
                  <Button ghost disabled={hasFilterParams} onClick={() => setFilterForm({
                    locale: '',
                    country: '',
                    timestamp:  '',
                    limit: '',
                    offset: ''
                  })}>Limpar</Button>
                  <Button size="big" onClick={() => applyFilterForm()}>Aplicar</Button>
                </S.FilterButtonWrapper>
              </S.FilterWrapper>
            </S.FilterContent>
          </div>
        </S.SearchWrapper>
        <S.PlayListWrapper>
          {isLoading && <Loading />}
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
