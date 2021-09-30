import { useQuery } from 'react-query'
import { client } from '~api/client'

export const getLocations = () => client.get('/locations')

export const useLocation = () => {
  return useQuery('location', () => getLocations().then((res) => res.data))
}
