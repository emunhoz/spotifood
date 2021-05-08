import useSWR from 'swr'
import HTTP_CLIENT from '../services/api'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await HTTP_CLIENT.get(url)

    return response.data
  })

  return { data, error }
}
