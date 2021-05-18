import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

interface FilterContextData {
  filterForm: {
    locale: string
    country: string
    timestamp: string
    limit: string
    offset: string
  }
  setFilterForm: any
  clearFilter: () => void
  removeFilterByItem: (filterName: string) => void
  handleToogleFilter: (toggle: boolean) => void
  toggleFilter: boolean
  translate: { [key: string]: string }
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

const FilterProvider = ({ children }: any) => {
  const [toggleFilter, setToogleFilter] = useState(false)
  const [filterForm, setFilterForm] = useState({
    locale: '',
    country: '',
    timestamp: '',
    limit: '',
    offset: ''
  })

  const translate: { [key: string]: string } = {
    locale: 'Idioma',
    country: 'País',
    timestamp: 'Data',
    limit: 'Items por página',
    offset: 'Páginas'
  }

  function removeFilterByItem (filterName: string) {
    toast.success(`Filtro ${translate[filterName]} foi removido!`)
    return setFilterForm({ ...filterForm, [filterName]: '' })
  }

  function handleToogleFilter (toggle: boolean) {
    if (!toggleFilter) document.body.style.overflow = 'hidden'
    if (toggleFilter) document.body.removeAttribute('style')

    return setToogleFilter(toggle)
  }

  function clearFilter () {
    setFilterForm({
      locale: '',
      country: '',
      timestamp: '',
      limit: '',
      offset: ''
    })
  }

  return (
    <FilterContext.Provider
      value={{
        filterForm,
        setFilterForm,
        clearFilter,
        removeFilterByItem,
        handleToogleFilter,
        toggleFilter,
        translate
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

function useFilter () {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be used within an FilterProvider.')
  }

  return context
}

export { FilterProvider, useFilter }
