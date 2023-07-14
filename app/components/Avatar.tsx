'use client'

import Image from 'next/image'

import React from 'react'

type Props = {}

function Avatar({}: Props) {
  return (
    <Image className='rounded-full' height='30' width='30' alt='avatar' src=''/>
  )
}

export default Avatar