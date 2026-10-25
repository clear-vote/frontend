import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { DonationsModal } from '@/app/modules/modals/DonationsModal';
import { useMasterContext } from '@/context/MasterContext';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// @react-pdf/renderer and pdfjs only run in the browser
const BallotPdfPreview = dynamic(() => import('@/app/modules/cards/BallotPdfPreview'), { ssr: false });

interface SendResultsPageProps {
  onBackClick: () => void;
}

export const SendResultsPage: React.FC<SendResultsPageProps> = ({ onBackClick }) => {
  const [error, setError] = useState('');
  const { email, setEmail, isDesktop } = useMasterContext();

  //Ensures email page starts on the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const validateEmail = (email: string | null) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    console.log('Submitted email:', email);
    // TODO: email trigger with datapoints
    window.location.href = '/results';
  };

  // TODO: make this for homepage of clearvote
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="the-fancy-background" style={{
      position: 'relative',
      width: '100%',
      height: 'auto',
      minHeight: '100vh',
      fontFamily: "'IBM Plex Sans', sans-serif",
      paddingTop: isDesktop ? '80px' : '45px', // Add padding to account for the toolbar
      paddingBottom: '48px',
    }}>
      <div
        className="mx-auto bg-white flex flex-col items-center text-center"
        style={{
          width: 'calc(100% - 32px)',
          maxWidth: '736px',
          marginTop: isDesktop ? '48px' : '24px',
          borderRadius: '24px',
          padding: isDesktop ? '40px 40px 48px' : '32px 20px 40px',
          boxShadow: '0 20px 50px rgba(120, 30, 70, 0.25)',
        }}
      >
        {/* Check badge */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: '110px', height: '110px', backgroundColor: '#EEEAFD' }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: '90px', height: '90px', backgroundColor: '#947FEE' }}
          >
            <CheckIcon style={{ color: 'white', fontSize: '44px' }} />
          </div>
        </div>

        <h1 className="font-bold" style={{ fontSize: isDesktop ? '44px' : '34px', color: '#2D3142', marginTop: '20px' }}>
          Congratulations!
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#242628', marginTop: '12px', maxWidth: '620px' }}>
          You&apos;ve just completed your ballot... well, almost. You still need to vote!
          Download your picks as a PDF so you&apos;re ready to fill out the real one.
        </p>

        <div className="w-full" style={{ marginTop: '32px' }}>
          <BallotPdfPreview onEditClick={onBackClick} />
        </div>

        <hr className="w-full border-gray-200" style={{ margin: '32px 0' }} />

        <h2 className="font-bold" style={{ fontSize: '24px', color: '#2D3142' }}>
          Stay informed when the next election drops
        </h2>
        <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: '20px' }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfJv_dhF3NUDy8ENPxXcwMwqfOAlu7Yl8s6EM6madDgzjbseA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-12 px-6 rounded-md font-bold text-white bg-[#2D3142] hover:bg-[#1F222E]"
          >
            Join mailing list
          </a>
          <Link
            href="https://donate.stripe.com/3cs0061x75s88OA000"
            target="_blank"
            className="inline-flex items-center h-12 px-6 rounded-md font-bold text-white bg-[#E57AA3] hover:bg-[#D9628F]"
          >
            <FavoriteBorderIcon style={{ fontSize: '20px' }} />&nbsp;Donate
          </Link>
        </div>

        {/* <div className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSubmit} className="bg-[#60D052] hover:bg-green-600">
            Let&apos;s Get My Ballot!
          </Button>
        </div> */}
      </div>
    </div>
  );
}