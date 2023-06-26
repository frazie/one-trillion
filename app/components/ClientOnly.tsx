'use client'

import { useState, useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

const ClientOnly = ({children}: Props) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
      setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null
    }
    
  return (
    <>
        {children}
    </>
  )
}

export default ClientOnly

//the purpose of this is to prevent a hydration error which occurs when the page is refreshed and clicked on. The fuction will ensure everything has loaded first before anything else can be done by the page