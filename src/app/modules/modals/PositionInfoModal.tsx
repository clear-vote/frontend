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
import { getPositionInfo } from '@/utils/informationals';

type PositionInfoModalProps = {
  position: string;
};

const PositionInfoModal = ({ position }: PositionInfoModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          {getPositionInfo(position)}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PositionInfoModal;
