import useSWR from 'swr'
import HTTP_CLIENT from '../services/api'

const fetcher = (url: string) => HTTP_CLIENT.get(url).then(res => res.data)

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isValidating } = useSWR<Data, Error>(url, fetcher)

  return { data, error, isValidating }
}
