'use client'

import { useSearchParams } from 'next/navigation'

export default function useReferrer() {

  const searchParams = useSearchParams()

  const referralId = searchParams?.get('ref')
  const referrer = searchParams?.get('referrer')

  return {
    referralId,
    referrer 
  }

}

