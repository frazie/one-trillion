'use client'

import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { AiFillApple } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import  {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'

type Props = {}

const RegisterModal = (props: Props) => {
    const registerModal = useRegisterModal()
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
            password: ''

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
                onClick={() => {}}
            />
            <Button 
                outline
                label='Continue with Apple'
                icon={AiFillApple}
                onClick={() => {}}
            />
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal