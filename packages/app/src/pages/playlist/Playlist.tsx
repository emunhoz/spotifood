import { useState } from 'react'
import { SearchBar, PlaylistCard, Button, Input, SelectInput, Label, Loading } from '@monorepo/ui-components'
import SpotifoodLogo from '../../images/spotifood-logo.svg'
import CloseIcon from '../../images/close-icon.svg'
import { useAuth } from '../../contexts/auth'
import objectWithValues from '../../helpers/object-with-values'
import encodeQueryData from '../../helpers/encode-query-data'
import toast from 'react-hot-toast'
import { useFetch } from '../../hooks/use-fetch'
import * as S from './Playlist.style'

interface ResponseDataFromSpotifyPlaylist {
  playlists: {
    items: any
  }
}

function Playlist () {
  const [toggleFilter, setToogleFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [handleParams, setHandleParams] = useState({})
  const { signOut } = useAuth()
  const maxCalendarDate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  const [filterForm, setFilterForm] = useState({
    locale: '',
    country: '',
    timestamp:  '',
    limit: '',
    offset: ''
  })

  const params = objectWithValues(handleParams)
  const { data: playlistData, error: playlistError } = useFetch<ResponseDataFromSpotifyPlaylist>(`/browse/featured-playlists?${encodeQueryData(params)}`)
  const { data: filterData } = useFetch('https://www.mocky.io/v2/5a25fade2e0000213aa90776')

  
  if (!playlistData) return <Loading />

  function handleToogleFilter (toggle: boolean) {
    if (!toggleFilter) document.body.style.overflow = 'hidden'
    if (toggleFilter) document.body.removeAttribute('style')

    return setToogleFilter(toggle)
  }

  async function applyFilterForm () {
    try {
      setHandleParams(filterForm)
      filterData && toast.success('Filtros aplicados!', { duration: 6000 })
    } catch (error) {
      playlistError && toast.error('Algo deu errado com os filtros! Tente novamente', { duration: 6000 })
    } finally {
      handleToogleFilter(false)
    }
  }

  function clearFilterForm () {
    setFilterForm({
      locale: '',
      country: '',
      timestamp:  '',
      limit: '',
      offset: ''
    })
    setHandleParams({})
    handleToogleFilter(false)
    toast.success('Filtros removidos!', { duration: 6000 })
  }

  const filteredPlaylist = playlistData.playlists.items?.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()))
  const filterDataObject = filterData?.filters
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
                {filterDataObject && 
                <div>
                  <SelectInput label={filterDataObject[0].name} value={filterForm.locale} onChange={(e) => setFilterForm({ ...filterForm, locale: e.target.value })}>
                    <option value="" defaultValue=''>Selecione um idioma</option>
                    {filterDataObject[0].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </SelectInput>

                  <SelectInput label={filterDataObject[1].name}  value={filterForm.country} onChange={(e) => setFilterForm({ ...filterForm, country: e.target.value })}>
                    <option value="" defaultValue=''>Escolha o país de origem</option>
                    {filterDataObject[1].values.map((item: { value: string, name: string }, key: number) => (
                      <option key={key} value={item.value}>{item.name}</option>
                    ))}
                  </SelectInput>

                  <Input
                    label={filterDataObject[2].name}
                    type='datetime-local'
                    onChange={(e) => setFilterForm({ ...filterForm, timestamp: new Date(e.target.value).toISOString() })}
                    min='2021-01-01T00:00'
                    max={maxCalendarDate}
                  />

                  <Input type="number" placeholder="Quantidade para visualizar na página" label={filterDataObject[3].name} value={filterForm.limit} onChange={(e) => setFilterForm({ ...filterForm, limit: e.target.value })} />
                  <Input type="number" placeholder="Número de playlist por página" label={filterDataObject[4].name} value={filterForm.offset} onChange={(e) => setFilterForm({ ...filterForm, offset: e.target.value })} />
                </div>}
                <S.FilterButtonWrapper>
                  <Button ghost disabled={hasFilterParams} onClick={() => clearFilterForm()}>Limpar</Button>
                  <Button size="big" onClick={() => applyFilterForm()}>Aplicar</Button>
                </S.FilterButtonWrapper>
              </S.FilterWrapper>
            </S.FilterContent>
          </div>
        </S.SearchWrapper>
        <S.PlayListWrapper>
          {!playlistData && <Loading />}
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
