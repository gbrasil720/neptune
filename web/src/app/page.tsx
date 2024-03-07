'use client'

import { Navbar } from '@/components/navbar'
import { PreLoader } from '@/components/pre-loader'
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

    setTimeout(() => {
      handleLoadData()
    }, 2000)
  }, [])

  return (
    <>
      <Navbar />
      <>{data ? <UsersTable data={data} /> : <PreLoader />}</>
    </>
  )
}
