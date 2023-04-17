import { useUser } from '@clerk/nextjs';
import { Avatar, Loading } from '@nextui-org/react';
import React from 'react'
import { api } from '~/utils/api';

export default function Offers() {
  const user = useUser()
  const { data: messages, isLoading } = api.listings.getMessages.useQuery();
  if (isLoading) {

    return (
      <div className='pt-[6rem] flex min-h-screen items-center justify-center'><Loading /></div>
    )
  }
  interface Message {
    id: string;
    fromUser: string;
    fromUserName: string;
    message: string;
    listingId: string;
    createdAt: string;
  }
  const allMessage = messages?.flatMap((item) => item.message)
  return (
    <div className='pt-[6rem] min-h-screen flex flex-col '>
      <div className='text-4xl font-semibold px-7 lg:px-12 p-4'>All Offers</div>
      {allMessage?.map((message) =>

        <div className=' flex gap-5 items-center px-7 lg:px-10 p-5 ' key={message?.id}>
          <Avatar />
          <div className='flex-col flex text-left'>
            <div className='font-semibold text-lg'>{message.fromUserName}</div>
            <div className='text-gray-500 text-md'>{message.message}</div>

          </div>
        </div>)}
    </div>
  )
}
