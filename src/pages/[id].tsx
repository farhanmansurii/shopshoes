import { Button, Loading } from '@nextui-org/react';
import { type Listing } from '@prisma/client';
import { type ApiError } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'

export default function Details() {
  const router = useRouter()


  const { data: listing, isLoading, isError } = api.listings.get.useQuery<Listing>(
    {
      id: router.query.id as string
    },
    {
      enabled: !!router.query.id
    }
  );
  if (isLoading) {

    return (
      <div className='pt-[6rem] flex min-h-screen items-center justify-center'><Loading /></div>
    )
  }

  return (
    <div className="container py-8 pt-[6rem] mx-auto">
      <Link href="/">
        <Button className="text-lg font-bold">Back to listings</Button>
      </Link>
      <div className="max-w-lg mx-auto">
        <img
          src={listing?.image}
          alt={listing?.name}
          className='w-10/12 mx-auto'
        />
      </div>
      <div className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{listing?.name}</h1>
        <p className="text-2xl font-bold mb-4">${listing?.price}</p>
        <p className="text-lg mb-8">{listing?.description}</p>
        <Button flat>Add to Cart</Button>
      </div>
    </div>
  )
}
