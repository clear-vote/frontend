import React, { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Key } from 'readline';

interface SendResultsPageProps {
  onBackClick: () => void;
}

export const SendResultsPage: React.FC<SendResultsPageProps> = ({onBackClick}) => {
  const [email, setEmail] = useState('');

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
    <div className="flex space-x-2">
      <Button onClick={onBackClick}>Back</Button>
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSubmit}>Save my results</Button>
      {/* donate is a new page */}
      <Button>Donate</Button>
      {/* <DonationsModal/> */}
    </div>
  );
}