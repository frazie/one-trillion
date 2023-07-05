'use client'

import useRegisterModal from "../hooks/useRegisterModal"

export default function Signup() {
  const registerModal = useRegisterModal()
  return (
    <div className="">
      <div className="py-20">
      <h1>You were referred by your friend to One Trillion trees.</h1>
      <button
        onClick={registerModal.onOpen}
      >
        sign up here
      </button>
      </div>
      
    </div>
  
  )
}