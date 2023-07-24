'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import Container from '../components/Container';
import { toast } from 'react-hot-toast'
import { safeUser } from '../types';


type Props = {
  currentUser?: safeUser | null
}

export default function Dashboard({ currentUser }: Props) {
  const [referralLink, setReferralLink] = useState('');

  const handleGenerateLink = () => {
    const referrer = currentUser?.id
    const link = `http://localhost:3000?ref=${referrer}`;
    toast.loading('generating your referral link', {duration: 500})
    setReferralLink(link);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Copied to clipboard!')
  };

  return (
    <div className=''>
      
      <Container>
        <div className='flex flex-col pt-20 py-2'>
          <button className='' onClick={handleGenerateLink}>Click to generate your referral link</button>
        
          {referralLink && (
              <>
                <div className="mt-3">
                  Your referral link is: <span className="font-semibold">{referralLink}</span>
                </div>
                <button onClick={handleCopyToClipboard} className="btn btn-sm btn-secondary mt-3">Copy Link</button>  
              </>
            )}
        </div>
        
      </Container>
      
    </div>
  );
}