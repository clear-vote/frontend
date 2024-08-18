import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Replace 'your-button-library' with the actual library you are using for buttons

interface ProgressCardProps {
  difference: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ difference }: ProgressCardProps) => {
  return (
    <div>
      <p>Difference between contests and pinned candidates: {difference}</p>
      {difference === 0 && (
        <Link href="/submit">
          <Button>Next</Button>
        </Link>
      )}
    </div>
  );
};