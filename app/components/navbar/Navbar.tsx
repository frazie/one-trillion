'use client'

import React from 'react'
import Container from '../Container'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='fixed w-full bg-grey z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                One trillion trees Demo
            </Container>
        </div>
    </div>
  )
}

export default Navbar