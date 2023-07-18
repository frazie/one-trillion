'use client'

import Logo from './Logo'
import React from 'react'
import Container from '../Container'
import UserMenu from './UserMenu'
import { safeUser } from '@/app/types'

type Props = {
  currentUser?: safeUser | null
}

const Navbar = ({ currentUser }: Props) => {
  console.log(currentUser)

  return (
    <div className='fixed w-full bg-grey z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
              <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo />
                <UserMenu currentUser={currentUser} />
              </div>
                
            </Container>
        </div>
    </div>
  )
}

export default Navbar