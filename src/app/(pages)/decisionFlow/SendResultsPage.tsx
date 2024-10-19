import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { DonationsModal } from '@/app/modules/modals/DonationsModal';
import { useMasterContext } from '@/context/MasterContext';
import Link from 'next/link';

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
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      fontFamily: "'IBM Plex Sans', sans-serif",
      paddingTop: isDesktop ? '80px' : '0px', // Add padding to account for the toolbar
    }}> 
      <div className="font-bold" style={{ padding: "10px", backgroundColor: "#2426280D", borderBottom: '1px solid #24262814' }}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }} />
        &nbsp;&nbsp;&nbsp;Get Your Ballot!
      </div>
      <div style={{      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'}}>
        <br></br>
        <h1 className='font-bold text-xl'>Congratulations!</h1>
        <br />
        <p>
          You&apos;ve just completed your ballot!! (well, sort of). Click back and make note of your picks so you&apos;re ready to fill it out.
        </p>
        <p>
          Want to stay informed when the next election drops? Join our mailing list!
        </p>
        <br></br>
        <a href="https://forms.gle/zmTGWCvHDgNQjrJf7" target="_blank" rel="noopener noreferrer" className="bg-[#60D052] hover:bg-green-600 text-white py-2 px-4 rounded">
          Join Mailing List
        </a>
        <br></br>
        <p>
          If you find this service valuable, please consider donating to help us make voting a better experience for everyone.
        </p>
        <br />
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
        <br></br>
        <div className="flex justify-center items-center">
          {/* donate is a new page */}
          <Link href="https://donate.stripe.com/3cs0061x75s88OA000" target='_blank'>
  <Button className="bg-[#60D052] hover:bg-green-600 text-white py-2 px-4 rounded">
    Donate
  </Button>
</Link>        </div>
        <br></br>
        <div className="flex justify-center items-center">
          {/* <DonationsModal /> */}
          {/* TODO: add donations link! */}
        </div>
      </div>
    </div>
  );
}