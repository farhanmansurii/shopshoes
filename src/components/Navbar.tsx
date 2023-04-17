import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Avatar, Dropdown, Navbar } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function HomeNavbar() {
  const user = useUser()
  const router = useRouter()

  const collapseItems = [
    { text: 'About', link: '/' },
    { text: 'Browse', link: '/' },
    { text: 'Sell', link: '/sell' },
  ];
  return (
    <div className=' fixed z-50 w-full'>
      <Navbar isBordered variant={'floating'}  >
        <Link href='/'>
          <div className='font-semibold'>Sell<span className='text-blue-500'>Yo</span>Shoes</div>
        </Link>

        <Navbar.Collapse className='font-semibold' >
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link
                href={`/${item.link}`}
              >
                {item.text}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
        <div className='flex lg:hidden  items-center gap-5 font-semibold '>
          <Navbar.Toggle aria-label="toggle navigation" />
          <button>

            {user.isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton>
                <div>Login</div>
              </SignInButton>
            )}
          </button>
        </div>
        <div className='gap-5 font-semibold hidden lg:flex'>

          <button>
            <Link href='/'>

              Browse All
            </Link>
          </button>
          <button>
            <Link href='/sell'>

              Sell
            </Link>
          </button>
          <button>

            {user.isSignedIn ? (
              <UserButton />
            ) : (
            <SignInButton>
                  <div>Login</div>
                </SignInButton>
            )}
          </button>
        </div>
      </Navbar>
    </div>
  )
}
