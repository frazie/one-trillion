'use client'

import { signIn } from 'next-auth/react'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { AiFillApple } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import  {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import { useRouter } from 'next/navigation'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useRegisterModal from '@/app/hooks/useRegisterModal'

type Props = {}

const LoginModal = (props: Props) => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    // form control
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false)

            if (callback?.ok){
                toast.success('Logged In')
                router.push('/dashboard')
                loginModal.onClose()                
            }

            if (callback?.error){
                toast.error(callback.error)
            }
        })
        
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome back to one trillion trees'
            subtitle='Login to you account'
            center
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Login with Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label='ogin with Apple'
                icon={AiFillApple}
                onClick={() => {}}
            />
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal