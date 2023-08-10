'use client'

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { v4 as uuid } from 'uuid';
import Container from '../components/Container';
import { toast } from 'react-hot-toast'
import { SafeUser } from '../types';
import TreeTable from '../components/tables/TreeTable';
// import { getUserTrees } from '../actions/getAllTrees';
// import Heading from '../components/Heading';

type Props = {
  currentUser?: SafeUser | null
  treeData: any
  // referrals: any
}

export default function Dashboard({ currentUser, treeData }: Props) {
  const [referralLink, setReferralLink] = useState('');
  const [userTrees, setUserTrees] = useState([])

  const handleGenerateLink = () => {
    const referrer = currentUser?.id
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referrer}`;
    toast.loading('generating your referral link', {duration: 500})
    setReferralLink(link);
  };

  useEffect(() => {
    setUserTrees(treeData)
    // console.log(referrals)
  }, [treeData])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Copied to clipboard!')
  };

  return (
    <>
      <Container>
      <div className=" flex flex-col items-center justify-center pt-20 bg-gray-100 p-4">
        <div >
          <div className="flex flex-col items-center w-full max-w-lg bg-white p-4 shadow-md rounded-lg">
            <button className="mb-3" onClick={handleGenerateLink}>
              Click to generate your referral link
            </button>

            {referralLink && (
              <div className="flex flex-col items-center mt-3">
                <div>
                  Your referral link is:{' '}
                  <span className="font-semibold">{referralLink}</span>
                </div>
                <button
                    onClick={handleCopyToClipboard}
                  className="btn btn-sm btn-secondary mt-3"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>

          <div className="w-full max-w-lg mt-8">
            <h1 className="text-2xl font-semibold mb-4">One Trillion Trees Rankings</h1>
            <TreeTable userTrees={userTrees} />
          </div>
        </div>
        {/* <div className='w-1/3'>
              <Heading title='Referrals' subtitle='the number of referrals that have joined one trillion trees' />
              <hr />
              <p>you have {referrals} active referrals!!</p>
        </div> */}
      
    </div>
        
      </Container>
      
    </>
  );
}