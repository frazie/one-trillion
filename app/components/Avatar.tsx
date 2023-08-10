'use client'

import Image from 'next/image'

import React from 'react'
// import { safeUser } from '../types'

type Props = {
  src: string | null | undefined
}

function Avatar({src}: Props) {
  return (
    <Image className='rounded-full' height='30' width='30' alt='avatar' src={src || '/images/userprofile.png'} />
  )
}

export default Avatar