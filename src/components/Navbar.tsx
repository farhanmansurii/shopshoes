import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Avatar, Dropdown, Navbar } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function HomeNavbar() {
  const user = useUser()
  return (
    <div className=' fixed z-50 w-full'>
      <Navbar isBordered variant={'floating'}  >
        <Link href='/'>
          <div className='font-semibold'>Sell<span className='text-blue-500'>Yo</span>Shoes</div>
        </Link>
        <div className='flex items-center  lg:hidden font-semibold gap-5'>
          <Dropdown>
            <Dropdown.Trigger>
              <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="new">
                <Link href='/'>

                  Categories
                </Link>
              </Dropdown.Item>
              <Dropdown.Item key="copy">
                <Link href='/'>

                  Browse All
                </Link>
              </Dropdown.Item>
              <Dropdown.Item key="edit">
                <Link href='/sell'>

                  Sell
                </Link>
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
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
