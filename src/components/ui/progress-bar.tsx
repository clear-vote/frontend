import * as React from 'react';
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
    value: number;
}

const ProgressBar = ({ value } : ProgressBarProps) => {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <Progress.Root 
      className="relative overflow-hidden bg-gray-200 rounded-full w-full h-4"
      value={progress}
    >
      <Progress.Indicator 
        className="bg-blue-500 h-full rounded-full transition-transform"
        style={{ transform: `translateX(-${progress}%)`, background: 'linear-gradient(to right, #947FEE, #B17FEE, #D283FF)' }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
