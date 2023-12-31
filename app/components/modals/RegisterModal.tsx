'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { AiFillApple } from 'react-icons/ai'
import { useState } from 'react'
import  {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useReferrer from '@/app/hooks/useReferrer'
import { signIn } from 'next-auth/react'

// type Props = {}

const RegisterModal = () => {
    const { referralId } = useReferrer()
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
            name: '',
            email: '',
            password: '',
            referralId: referralId || '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome to one trillion trees'
            subtitle='Create an account'
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
                id='name'
                label='Name'
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
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            {/* <Button 
                outline
                label='Continue with Apple'
                icon={AiFillApple}
                onClick={() => {}}
            /> */}
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className="text-xs flex justify-center">
                    <p>By clicking "Create Account" or "Continue with Google", you agree to One trillion Trees TOS and Privacy Policy</p>
                </div>
                <div className='justify-center flex flex-row items-center gap-2 mt-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={() => {
                            loginModal.onOpen();
                            registerModal.onClose();
                        }}
                        className='text-neutral-800 cursor-pointer hover:underline hover:text-blue-300'
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Create account'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal