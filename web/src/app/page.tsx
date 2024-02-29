'use client'

import UsersTable from '@/components/user-table'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState()

  useEffect(() => {
    async function handleLoadData() {
      const { data }: any = await api.get('/users')

      setData(data.users)
    }

    handleLoadData()
  }, [])

  if (!data) {
    return console.log('LOADING')
  }

  return <UsersTable data={data} />
}
