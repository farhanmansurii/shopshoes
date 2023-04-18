import { useUser } from '@clerk/nextjs';
import { Avatar, Loading } from '@nextui-org/react';
import React, { useState } from 'react'
import { api } from '~/utils/api';

interface GroupedMessage {
  fromUser: string;
  listingId: string;
  fromUserName: string;
  messages: Messages[];
}

interface Message {
  id: string;
  fromUser: string;
  fromUserName: string;
  listingId: string;
  message: string;
  createdAt: Date;
  text?: string
}
interface Messages {
  id: string;
  fromUser: string;
  fromUserName: string;
  text: string
}

export default function Offers() {
  const user = useUser()
  const { data: messages, isLoading } = api.listings.getMessages.useQuery();

  const [expanded, setExpanded] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className='pt-[6rem] flex min-h-screen items-center justify-center'>
        <Loading />
      </div>
    )
  }

  const allMessages = messages?.flatMap((item) => item.message) as Message[];
  const groupedMessages = groupMessagesByListingId(allMessages);

  function groupMessagesByListingId(messages: Message[]): GroupedMessage[] {
    const groupedMessages: { [key: string]: GroupedMessage } = {};

    for (const message of messages) {
      const { id, fromUser, fromUserName, listingId, message: text } = message;
      const key = `${listingId}:${fromUser}`;

      if (key in groupedMessages) {
        groupedMessages[key]?.messages?.push({ id, text, fromUser, fromUserName });
      } else {
        groupedMessages[key] = {
          fromUser,
          listingId,
          fromUserName,
          messages: [{ id, text, fromUser, fromUserName }]
        };
      }
    }

    return Object.values(groupedMessages);
  }



  return (
    <div className='pt-[6rem] mb-10 min-h-screen flex flex-col'>
      <div className='text-4xl font-semibold px-7 lg:px-12 p-4'>All Offers</div>
      {groupedMessages.map((groupedMessage, i) => (
        <div


          key={groupedMessage.fromUser} className={`flex gap-5 items-center px-7 lg:px-10 p-5 ${i % 2 === 0 ? 'bg-blue-50/50' : ''}`}>
          <Avatar />
          <div className='flex-col flex text-left'>
            <div className='font-semibold text-lg'>{groupedMessage.fromUserName}</div>
            <div className='text-gray-500 text-md'>
              <div className="flex flex-col gap-2">
                {expanded === i ? groupedMessage.messages.reverse().map((message, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setExpanded(-1)
                    }}
                    className="cursor-pointer"
                  >

                    <div>{message.text} </div>
                  </div>
                )) :
                  <div className=' flex items-center gap-4'>
                    <div className='my-1' >
                      {groupedMessage?.messages[groupedMessage?.messages.length - 1]?.text || ''} </div>
                    {groupedMessage?.messages.length > 1 &&

                      <div onClick={() => setExpanded(i)} className='text-blue-500 text-sm  '>
                        +{groupedMessage?.messages.length - 2} messages
                      </div>
                    }
                  </div>
                }
              </div>

            </div>
          </div>
        </div>))}
    </div>)
}

