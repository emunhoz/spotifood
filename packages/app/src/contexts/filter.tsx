import { createContext, useContext, useState } from 'react'

interface FilterContextData {
  filterForm: {
    locale: string
    country: string
    timestamp: string
    limit: string
    offset: string
  }
  setFilterForm: any
  clearFilter: any
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

const FilterProvider = ({ children }: any) => {
  const [filterForm, setFilterForm] = useState({
    locale: '',
    country: '',
    timestamp: '',
    limit: '',
    offset: ''
  })

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
    <FilterContext.Provider value={{ filterForm, setFilterForm, clearFilter }}>
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
