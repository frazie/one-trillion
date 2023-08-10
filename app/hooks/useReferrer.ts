'use client'

import { useSearchParams } from 'next/navigation'

export default function useReferrer() {

  const searchParams = useSearchParams()

  const referralId = searchParams?.get('ref')

  return {
    referralId 
  }

}

