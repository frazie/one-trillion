'use client'

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/inputs/Input'
import Button from '../components/Button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { SafeUser } from '../types'

type Props = {
    currentUser?: SafeUser | null
    trees: number
}

const Profile = ({currentUser, trees}: Props) => {
    const [treesPlanted, setTreesPlanted] = useState(0)

    //our form control
    const { register,reset, handleSubmit, formState: {errors}, getValues } = useForm<FieldValues>({
    defaultValues: {
        email: currentUser?.email || '',
        trees: 0,
    }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // setIsLoading(true)
        const formData = getValues()
        const treeValue = parseInt(formData.trees)

        try {
            await axios.post('/api/tree', { ...formData, trees: treeValue });
            toast.success('Trees planted successfully');
            reset({ tree: 0 });
          } catch (error) {
            toast.error('Something went wrong when planting your tree');
          } 
    }

    useEffect(()=> {
        setTreesPlanted(trees)    
    }, [trees])
    
  return (
    <div>
        <Container>
            <div className='pt-20 '>
                <div className='flex flex-col justify-between md:flex-row p-5'>
                    <div className='md:w-2/3 border border-black ml-4 p-2 text-left flex flex-col gap-3'>
                        <Heading title='Profile' />
                        <p>Welcome {currentUser?.name}, you have planted {treesPlanted} trees so far!</p>
                        <hr />
                        <p>Plant more and become a prime one trillion member</p>
                        <p>Visit the dashboard to see you global rankings and referrals</p>
                    </div>
                    <div className='md:w-1/3 p-2 border border-black ml-4'>
                        <div className='flex flex-col gap-3'>
                            <Heading title='Contribute to One Trillion trees' subtitle='Kindly enter the number of trees you want to plant here' center={true}/>
                            <hr />
                            {!currentUser && (
                                <Input
                                    id="email"
                                    label="Your email"
                                    register={register}
                                    errors={errors}
                                />
                            )}                      
                            <Input 
                                id='trees' 
                                label='Enter number of trees' 
                                register={register} 
                                errors={errors}
                            />
                            <hr />
                            <Button outline label='Plant tree' onClick={handleSubmit(onSubmit)} />
                            
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    </div>
  )
}

export default Profile