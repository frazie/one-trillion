'use client'
import { useState } from 'react';
// import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

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
    <div>
      <button onClick={handleGenerateLink}>Click to generate your referral link</button>
      <br />
      <input type="text" value={referralLink} readOnly />
      <br />
      <button onClick={handleCopyToClipboard}>Copy</button>
    </div>
  );
};
