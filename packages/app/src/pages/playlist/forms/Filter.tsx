import { useState } from 'react'
import { Button, Input, SelectInput } from '@monorepo/ui-components'
import objectWithValues from '../../../helpers/object-with-values'
import toast from 'react-hot-toast'
import { useFetch } from '../../../hooks/use-fetch'
import { useFilter } from '../../../contexts/filter'
import * as S from './Filter.style'

function FilterForm ({ onCloseFilter }: any) {
  const maxCalendarDate = new Date(
    new Date().toString().split('GMT')[0] + ' UTC'
  )
    .toISOString()
    .split('.')[0]
  const { filterForm, setFilterForm, clearFilter } = useFilter()
  const [form, setForm] = useState({ ...filterForm })

  const { data: filterData } = useFetch(
    'https://www.mocky.io/v2/5a25fade2e0000213aa90776'
  )

  const filterDataObject = filterData?.filters
  const hasFilterParams = Object.entries(objectWithValues(form)).length === 0

  async function applyFilterForm (e: any) {
    e.preventDefault()
    onCloseFilter()

    if (hasFilterParams)
      return toast(
        'É preciso adicionar alguma opção de filtro para aplicar na busca'
      )

    toast.success('Filtros aplicados!', { duration: 6000 })

    setFilterForm(form)
  }

  function clearFilterForm () {
    if (hasFilterParams)
      return toast('É preciso adicionar alguma opção para limpar os filtros')

    clearFilter()
    setForm({
      locale: '',
      country: '',
      timestamp: '',
      limit: '',
      offset: ''
    })
    onCloseFilter()
    toast.success('Filtros removidos!', { duration: 6000 })
  }

  return (
    <S.FilterWrapper onSubmit={e => applyFilterForm(e)}>
      {filterDataObject && (
        <>
          <SelectInput
            label={filterDataObject[0].name}
            value={form.locale}
            onChange={e => setForm({ ...form, locale: e.target.value })}
          >
            <option value='' defaultValue=''>
              Selecione um idioma
            </option>
            {filterDataObject[0].values.map(
              (item: { value: string; name: string }, key: number) => (
                <option key={key} value={item.value}>
                  {item.name}
                </option>
              )
            )}
          </SelectInput>

          <SelectInput
            label={filterDataObject[1].name}
            value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
          >
            <option value='' defaultValue=''>
              Escolha o país de origem
            </option>
            {filterDataObject[1].values.map(
              (item: { value: string; name: string }, key: number) => (
                <option key={key} value={item.value}>
                  {item.name}
                </option>
              )
            )}
          </SelectInput>

          <Input
            label={filterDataObject[2].name}
            type='datetime-local'
            onChange={e =>
              setForm({
                ...form,
                timestamp: new Date(e.target.value).toISOString()
              })
            }
            min='2021-01-01T00:00'
            max={maxCalendarDate}
          />

          <Input
            type='number'
            placeholder='Quantidade para visualizar na página'
            label={filterDataObject[3].name}
            value={form.limit}
            onChange={e => setForm({ ...form, limit: e.target.value })}
          />
          <Input
            type='number'
            placeholder='Número de playlist por página'
            label={filterDataObject[4].name}
            value={form.offset}
            onChange={e => setForm({ ...form, offset: e.target.value })}
          />
        </>
      )}
      <S.FilterButtonWrapper>
        <Button size='big' disabled={hasFilterParams}>
          Aplicar
        </Button>
        <S.FilterButtonWrapperClear onClick={() => clearFilterForm()}>
          Limpar
        </S.FilterButtonWrapperClear>
      </S.FilterButtonWrapper>
    </S.FilterWrapper>
  )
}

export default FilterForm
