'use client'

import ClientOnly from './components/ClientOnly';
import { useEffect, useState } from 'react';

import useRegisterModal from './hooks/useRegisterModal';
import useReferrer from '@/app/hooks/useReferrer'
import ToasterProvider from './providers/ToasterProvider';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import Navbar from './components/navbar/Navbar';
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

import { SafeUser } from './types'
import Input from './components/inputs/Input';
import Button from './components/Button';

type Props ={
  currentUser?: SafeUser | null
  treeData: any
  referrals: any
  trees: any
}

export default function Home({ currentUser, treeData, referrals, trees }: Props) {
  const registerModal = useRegisterModal()
  const { referrer } = useReferrer()
  const [referralLink, setReferralLink] = useState('');
  const [referral, setReferral]=useState(0)
  const [userTrees, setUserTrees] = useState([])
  const [treesPlanted, setTreesPlanted] = useState(0)
  const [mainReferrer, setMainReferrer] = useState('Your referrer')

  useEffect(() => {
    if (referrer){
      setMainReferrer(referrer)
    }
    
    const generateLink = () => {
      const referrerId = currentUser?.id;
      const referrerName = currentUser?.name || "Anonymous";
      const link = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referrerId}&referrer=${referrerName}`;
      setReferralLink(link);
    };

    setUserTrees(treeData);
    setReferral(referrals);
    setTreesPlanted(trees);

    generateLink();   
  }, [currentUser?.id, treeData, referrals, trees, referrer])


  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Copied to clipboard!')
  };


  //beginning of tree planting section
  const { register ,reset, handleSubmit, formState: {errors}, getValues } = useForm<FieldValues>({
    defaultValues: {
        email: currentUser?.email || '',
        trees: 0,
    }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      // setIsLoading(true)
      const formData = getValues()
      const treeValue = parseInt(formData.trees)

      if(treeValue <= 0){
          toast.error('cannot plant negative trees')
      }else{
          try {
          await axios.post('/api/tree', { ...formData, trees: treeValue });
          toast.success('Trees planted successfully');
          reset({ tree: 0 });
        } catch (error) {
          toast.error('Something went wrong when planting your tree');
        } 
      }
  }

  //end of tree planting section

  return (
  
      <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser}/>

        <div className="pt-16 sm:pt-20 lg:pt-20 h-screen px-5 sm:px-15 lg:px-20 flex flex-col ">
          <div className="my-2 sm:my-6 lg:my-6 xl:my-8 text-left md:text-center">
            {currentUser ? (
              <p className="text-[16px] sm:text-xl lg:text-2xl xl:text-2xl font-bold">You've Planted <span className="underline">{treesPlanted}</span> trees! keep it up</p>
            ) : (
              <p className="text-[16px] sm:text-xl lg:text-2xl xl:text-2xl font-bold">{mainReferrer} just planted a tree, thanks to YOU.</p>
            ) }
            
          </div>
          <div className="mb-1 sm:mb-2 lg:mb-3 xl:mb-4 flex flex-col text-left md:text-center">
            <p className="text-[16px] sm:text-lg lg:text-xl xl:text-2xl font-semibold">
              Spread the word & plant your own trees by sharing your personal referral link: <br/>
              <span className="underline text-blue-300">{referralLink}</span>
            </p>
            <button 
              type="button" 
              onClick={handleCopyToClipboard}
              className="border mx-auto py-2 px-2 sm:px-4 lg:px-6 shadow-lg mt-1 sm:mt-2 lg:mt-3 rounded-md uppercase transition"
            >
              Copy link
            </button>
            <div className="w-full text-center flex flex-col mt-5">
              <div className='mx-auto w-full sm:w-full lg:w-1/2 xl:w-1/3 items-center justify-center rounded-xl'>
                <div className='flex flex-col gap-3'>
                    {!currentUser && (
                      <>
                        <Input
                            id="email"
                            label="Your email"
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id="treeName"
                            label="Your Name"
                            register={register}
                            errors={errors}
                        />
                      </>
                                
                    )}                      
                    <Input 
                        id='trees' 
                        type='number'
                        min='1'
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
          {currentUser ? (
              <div className="my-2 sm:my-3 lg:my-4 xl:my-5">
                <div>
                  <p className="mx-auto text-[16px] sm:text-lg lg:text-xl xl:text-2xl">Post it on social, text it to friends, or add to your email signature. Every click = 1 tree!</p>
                </div>
                <div className="mt-10">
                  <span className="text-lg sm:text-xl lg:text-2xl mb-3 font-semibold">
                    How it works:
                  </span>
                  <p className="text-sm sm:text-lg lg:text-xl">
                    Share your link far and wide. Every time someone clicks on your link, we add one tree to your tree count, and one to theirs. At the end of each month, we'll send you an invoice to get your trees planted. <br/>
                    <span className="text-sm sm:text-lg lg:text-xl font-bold">One tree = $ 2.00. Our goal is to plant One Trillion Trees by 2050.</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-2 sm:my-3 lg:my-4 xl:my-5 ">
                <div>
                  <p className="mx-auto text-[16px] sm:text-lg lg:text-xl xl:text-2xl">
                    Post it on social, text it to friends, or add to your email signature. We'll plant a tree on your behalf when your friends click!
                  </p>
                </div>
                <div className="my-4 sm:my-6 lg:my-8 xl:my-10 flex flex-col text-center">
                  <p className="text-sm sm:text-lg lg:text-xl">
                    Together, we might just save the planet
                  </p>
                  <button 
                    // type="button" 
                    onClick={registerModal.onOpen} 
                    className="border mx-auto py-2 px-2 sm:px-4 lg:px-6 shadow-lg mt-1 sm:mt-2 lg:mt-3 rounded-md uppercase transition"
                    >
                      Get started
                    </button>
                </div>
              </div>
            )
          } 
          
          
        </div>
      
      </ClientOnly>
  );
};
