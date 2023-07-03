'use client'
import { useState } from 'react';
// import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import Container from './components/Container';

export default function Home() {
  const [referralLink, setReferralLink] = useState('');
  // const router = useRouter();

  const handleGenerateLink = () => {
    const referrerId = '33333'; // Replace with the actual referrer ID
    const id = uuid().split('-')[0]; // Extracting the first segment of UUID

    const link = `http://localhost:3000//signup?ref=${referrerId}&id=${id}`;
    setReferralLink(link);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Copied to clipboard!');
  };

  return (
    <div className=''>
      <Container>
        <div className='flex flex-col pt-20 py-2'>
          <button className='' onClick={handleGenerateLink}>Click to generate your referral link</button>
        
          <input className='w-auto' type="text" value={referralLink} readOnly />
          <button onClick={handleCopyToClipboard}>Copy</button>
        </div>
        
      </Container>
      
    </div>
  );
};