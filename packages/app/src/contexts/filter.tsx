import { createContext, useContext, useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'

export interface FilterForm {
  genre: string
  occasion: string
}

export type FilterName = keyof FilterForm

export const EMPTY_FILTER: FilterForm = { genre: '', occasion: '' }

export const FILTER_LABELS: Record<FilterName, string> = {
  genre: 'Genre',
  occasion: 'Occasion'
}

interface FilterContextData {
  filterForm: FilterForm
  setFilterForm: (form: FilterForm) => void
  clearFilter: () => void
  removeFilterByItem: (filterName: FilterName) => void
  handleToogleFilter: (toggle: boolean) => void
  toggleFilter: boolean
}

const FilterContext = createContext<FilterContextData | null>(null)

function FilterProvider ({ children }: { children: ReactNode }) {
  const [toggleFilter, setToogleFilter] = useState(false)
  const [filterForm, setFilterForm] = useState<FilterForm>(EMPTY_FILTER)

  function removeFilterByItem (filterName: FilterName) {
    toast.success(`${FILTER_LABELS[filterName]} filter removed`)
    setFilterForm({ ...filterForm, [filterName]: '' })
  }

  function handleToogleFilter (toggle: boolean) {
    document.body.style.overflow = toggle ? 'hidden' : ''
    setToogleFilter(toggle)
  }

  function clearFilter () {
    setFilterForm(EMPTY_FILTER)
  }

  return (
    <FilterContext.Provider
      value={{
        filterForm,
        setFilterForm,
        clearFilter,
        removeFilterByItem,
        handleToogleFilter,
        toggleFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

function useFilter (): FilterContextData {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider.')
  }

  return context
}

export { FilterProvider, useFilter }
