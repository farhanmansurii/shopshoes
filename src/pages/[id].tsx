import { type Listing } from '@prisma/client';
import { type ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'

export default function Details() {
  const router = useRouter()


  const { data: listing, isLoading, isError } = api.listings.get.useQuery<Listing, ApiError>(
    {
      id: router.query.id as string
    },
    {
      enabled: !!router.query.id
    }
  );

  return (
    <div className='pt-[6rem]'>{JSON.stringify(listing)}</div>
  )
}
