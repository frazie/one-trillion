'use client'


import React from 'react'
import { useRouter } from 'next/navigation'

// type Props = {}

const Logo = () => {
  const router = useRouter()
  return (
    <div 
    onClick={() => router.push('/')} 
    className='hidden md:block cursor-pointer'>One trillion trees Demo</div>
  )
}

export default Logo