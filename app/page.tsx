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
import axios from 'axios'

import { SafeUser } from './types'

type Props ={
  currentUser?: SafeUser | null
  trees: any
}

export default function Home({ currentUser, trees }: Props) {
  const registerModal = useRegisterModal()
  const { referrer, referralId } = useReferrer()
  const [referralLink, setReferralLink] = useState('');
  const [treesPlanted, setTreesPlanted] = useState(0)
  const [mainReferrer, setMainReferrer] = useState('We')

  useEffect(() => {
    const createAnonUser = async () => {
      const randomNum = Math.floor(Math.random() * 1000000000);
      const anonymousUser = `anon${randomNum}`;
      const userReferrer = referralId || '';
  
      const response = await axios.post('/api/anonUser', { email: `${anonymousUser}`, name: `${anonymousUser}`, referralId: `${userReferrer}` });
  
      const newAnonUser = await response.data;

      if (!currentUser){
            const generateLink = () => {
          const referrerId =  newAnonUser.id
          const referrerName = newAnonUser.name
          const link = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referrerId}&referrer=${referrerName}`;
          setReferralLink(link);
      };

      generateLink();
      }
      
    };

    const fetchData = async () => {
      try {

        if (referrer) {
          setMainReferrer(referrer);
        }

        if (currentUser){
          const generateLink = () => {
      // if (!anonUser) return;
        const referrerId =  currentUser?.id;
        const referrerName = currentUser?.name ;
        const link = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referrerId}&referrer=${referrerName}`;
        setReferralLink(link);
    };

    generateLink();
    }

        
        setTreesPlanted(trees);
  
      } catch (error) {
        // Handle any errors that occurred during fetch or setting state
        console.log(error);
      }
    };

    createAnonUser()
    fetchData();
  }, [currentUser]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Copied to clipboard!')
  };

  return (
  
      <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser}/>

        <div className="pt-20 sm:pt-20 lg:pt-20 h-screen px-5 sm:px-15 lg:px-20 flex flex-col ">
          <div className="my-2 sm:my-6 lg:my-6 xl:my-8 text-left md:text-center">
            {currentUser ? (
              <p className="text-[16px] sm:text-xl lg:text-2xl xl:text-2xl font-bold">You&apos;ve Planted <span className="underline">{treesPlanted}</span> trees! keep it up</p>
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
                    Share your link far and wide. Every time someone clicks on your link, we add one tree to your tree count, and one to theirs. At the end of each month, we&apos;ll send you an invoice to get your trees planted. <br/>
                    <span className="text-sm sm:text-lg lg:text-xl font-bold">One tree = $ 2.00. Our goal is to plant One Trillion Trees by 2050.</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-2 sm:my-3 lg:my-4 xl:my-5 ">
                <div>
                  <p className="mx-auto text-[16px] sm:text-lg lg:text-xl xl:text-2xl">
                    Post it on social, text it to friends, or add to your email signature. We&apos;ll plant a tree on your behalf when your friends click!
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
