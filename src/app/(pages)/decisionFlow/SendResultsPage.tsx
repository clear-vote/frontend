import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { DonationsModal } from '@/app/modules/modals/DonationsModal';
import { useMasterContext } from '@/context/MasterContext';

interface SendResultsPageProps {
  onBackClick: () => void;
}

export const SendResultsPage: React.FC<SendResultsPageProps> = ({ onBackClick }) => {
  const [error, setError] = useState('');
  const { email, setEmail } = useMasterContext();

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
    <div className="px-2">
      <div className="font-bold" style={{ padding: "10px", backgroundColor: "#2426280D", borderBottom: '1px solid #24262814' }}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }} />
        &nbsp;&nbsp;&nbsp;Get Your Ballot!
      </div>
      <br></br>
      <h1 className='font-bold text-xl'>Congratulations!</h1>
      <br />
      <p>You&apos;ve just completed your ballot!
        Please enter your email address below to recieve a copy of your ballot&#x2c; and thank you for taking the time to vote
        in this election! Make sure to get your actual ballot in by the deadline&#x2c; Clearvote does not do this for you!
      </p>
      <br />
      <div className="flex space-x-2">
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
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        {/* donate is a new page */}
        <Button className="bg-[#947FEE] hover:bg-purple-800">Donate</Button>
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        {/* <DonationsModal /> */}
        {/* TODO: add donations link! */}
      </div>
    </div>
  );
}