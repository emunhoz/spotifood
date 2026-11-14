import { useState, type FormEvent } from 'react'
import { Button, SelectInput } from '@monorepo/ui-components'
import toast from 'react-hot-toast'
import { useFilter, EMPTY_FILTER, FILTER_LABELS, type FilterName } from '../../../contexts/filter'
import { uniqueValues, type Playlist } from '../../../features/playlists/filter-playlists'
import * as S from './Filter.style'

interface FilterFormProps {
  playlists: Playlist[]
  onCloseFilter: () => void
}

const FILTER_FIELDS: FilterName[] = ['genre', 'occasion']

function FilterForm ({ playlists, onCloseFilter }: FilterFormProps) {
  const { filterForm, setFilterForm, clearFilter } = useFilter()
  const [form, setForm] = useState(filterForm)
  const hasSelection = Object.values(form).some(value => value !== '')

  function applyFilterForm (event: FormEvent) {
    event.preventDefault()
    setFilterForm(form)
    onCloseFilter()
    toast.success('Filters applied')
  }

  function clearFilterForm () {
    clearFilter()
    setForm(EMPTY_FILTER)
    onCloseFilter()
  }

  return (
    <S.FilterWrapper onSubmit={applyFilterForm}>
      {FILTER_FIELDS.map(field => (
        <SelectInput
          key={field}
          label={FILTER_LABELS[field]}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
        >
          <option value=''>Any {FILTER_LABELS[field].toLowerCase()}</option>
          {uniqueValues(playlists, field).map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </SelectInput>
      ))}
      <S.FilterButtonWrapper>
        <Button disabled={!hasSelection}>Apply</Button>
        <S.FilterButtonWrapperClear type='button' onClick={clearFilterForm}>
          Clear
        </S.FilterButtonWrapperClear>
      </S.FilterButtonWrapper>
    </S.FilterWrapper>
  )
}

export default FilterForm
