import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'

export default function Details() {
  const router = useRouter()
  const listing = api.listings.get.useQuery(
    {
      id: router.query.id
    },
    {
      enabled: !!router.query.id

    }
  )
  // if (listing.data) {
  //   return
  // }
  return (
    <div className='pt-[6rem]'>{JSON.stringify(listing)}</div>
  )
}
