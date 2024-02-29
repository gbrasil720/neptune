'use client'

import { PreLoader } from '@/components/pre-loader'
import { Skeleton } from '@/components/ui/skeleton'
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
    }, 5000)
  }, [])

  return (
    <>
      {data ? (
        <UsersTable data={data} />
      ) : (
        // <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <PreLoader />
      )}
    </>
  )
}
