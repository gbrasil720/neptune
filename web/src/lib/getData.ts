import { api } from './api'

export async function getData() {
  const { data } = await api.get('/users')

  return data
}
