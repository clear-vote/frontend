// PositionInfoModal.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

type PositionInfoModalProps = {
  position: string;
};

const PositionInfoModal = ({ position }: PositionInfoModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let dialogDescription = '';

  switch (position) {
    case 'city council':
      dialogDescription = 'This is the information for city council.';
      break;
    case 'county council':
      dialogDescription = 'This is the information for county council.';
      break;
    default:
      dialogDescription = 'We don\'t have any information for this position :( \n Let us know at hello@clearvote.info';
      break;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center ml-2">
          <HelpOutlineRoundedIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {position}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {dialogDescription}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PositionInfoModal;
