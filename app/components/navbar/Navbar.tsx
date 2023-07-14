'use client'

import Logo from './Logo'
import React from 'react'
import Container from '../Container'
import { User } from '@prisma/client'
import UserMenu from './UserMenu'

type Props = {
  currentUser?: User | null
}

const Navbar = ({ currentUser }: Props) => {
  console.log(currentUser)

  return (
    <div className='fixed w-full bg-grey z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
              <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo />
                <UserMenu />
              </div>
                
            </Container>
        </div>
    </div>
  )
}

export default Navbar