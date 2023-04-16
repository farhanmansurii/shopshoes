import { useAuth } from '@clerk/nextjs';
import { Button, Loading } from '@nextui-org/react';
import { type Listing } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';

import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'
type Inputs = {
  id: string
  name: string;
  description: string;
  price: number;
  image: string
  condition: string
  size?: string
};
export default function Details() {
  const router = useRouter()
  const user = useAuth()

  const { data: listing, isLoading, } = api.listings.get.useQuery<Inputs>(
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


  return (<>
    <Head>
      <title>{listing?.name}</title>
      <meta name="description" content="Generated by create-t3-app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container mx-auto  pt-[6rem] px-4 py-8">
      <div className="container text-sm mx-auto">
        <ul className="flex">
          <li className="mr-2 hover:underline text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-2">
            <span className="text-gray-500">{'>'}</span>
          </li>
          <li className="mr-2">
            <span className=" hover:underline capitalize text-gray-500">{listing?.name}</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap mb-20  -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <img src={listing?.image as string} alt={listing?.name} className="w-10/12 lg:w-full mx-auto" />
        </div>
        <div className="w-full flex my-auto flex-col gap-2 text-left lg:w-1/2 px-4">
          <h1 className="text-4xl capitalize font-medium mb-2">{listing?.name}</h1>
          <p className="text-gray-500 text-sm capitalize ">{listing?.description}</p>
          <div className="flex items-center">
            <span className="text-lg font-medium mr-2"> ₹ {Number(listing?.price) * 1.1 + 150}</span>
            <span className="text-gray-500 text-xs">(Shipping + Tax included )</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-lg font-medium mr-2">{listing?.size}</span>

            <span className="text-gray-500 text-sm"> Sizing</span>
          </div>
          <div className="flex items-center mb-8">
            <span className="text-gray-500 text-sm mr-2">Condition:</span>
            <span className={`text-sm bg-green-100 px-3 py-1 capitalize rounded-xl font-medium ${listing?.condition === 'new' ? 'text-green-500' : 'text-yellow-500'}`}>
              {listing?.condition}
            </span>
          </div>
          <Button disabled={!user?.userId} shadow className="bg-black text-white rounded-lg px-6 py-2 font-medium w-full hover:bg-gray-900">
            {!user?.userId ? "Sign In to Buy" : 'Buy Now'}
          </Button>
          <p className="text-center text-gray-500 text-sm mt-2">100% Authentic</p>
        </div>
      </div>
    </div>

  </>
  )
}
