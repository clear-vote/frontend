import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DonationsModal } from '../modals/DonationsModal';

interface SendResultsPageProps {
  onBackClick: () => void;
}

export const SendResultsPage: React.FC<SendResultsPageProps> = ({ onBackClick }) => {
  const [email, setEmail] = useState('');

  //Ensures email page starts on the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = () => {
    // Handle the submission here
    console.log('Submitted email:', email);
    // Add your logic here (e.g., form validation, API calls, etc.)
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (


    <div>
      <div className="font-bold" style={{ padding: "10px", backgroundColor: "#2426280D", borderBottom: '1px solid #24262814' }}>
        <ArrowBackIcon onClick={onBackClick} style={{ width: '20px', transform: "translateY(-2px)" }} />
        &nbsp;&nbsp;&nbsp;Get Your Ballot!
      </div>
      <br></br>
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSubmit} style={{ backgroundColor: "#60D052"}}>Submit</Button>
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        {/* donate is a new page */}
        <Button style={{ backgroundColor: '#947FEE'}}>Donate</Button>
      </div>
      <br></br>
      <div className="flex justify-center items-center">
        <DonationsModal />
      </div>
    </div>
  );
}