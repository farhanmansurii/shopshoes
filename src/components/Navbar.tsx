import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Navbar } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function HomeNavbar() {
  const user = useUser()
  return (
    <div className=' fixed z-50 w-full'>
      <Navbar isBordered variant={'floating'}  >
        <Link href='/'>

          <div className='font-semibold'>Sell Your Shoe</div>
        </Link>
        <div className='flex items-center  font-semibold gap-5'>

          <div>Browse</div>
          <div>Offers</div>
          <Link href='/sell'>
            <div>Sell</div>
          </Link>
          {user.isSignedIn ?

            <UserButton /> :
            <SignInButton>
              <div>Login</div>
            </SignInButton>
          }
        </div>
      </Navbar></div>
  )
}
