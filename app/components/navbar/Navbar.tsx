'use client'

import React from 'react'
import Container from '../Container'
import { User } from '@prisma/client'

type Props = {
  currentUser?: User | null
}

const Navbar = ({ currentUser }: Props) => {
  console.log(currentUser)

  return (
    <div className='fixed w-full bg-grey z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                One trillion trees Demo
                <div>
                  welcome {currentUser?.name}
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar