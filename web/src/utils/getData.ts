import { User } from '../components/users-table/columns'
import { api } from './api'

type Routes = {
  path: 'allUsers' | 'specificUsers'
  params?: string
}

export async function getData(): Promise<User[] | any> {
  const { data }: any = api.get('/users')

  console.log(data)
}
