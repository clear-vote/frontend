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
import InfoIcon from '@mui/icons-material/Info';

type JurisdictionModalProps = {
  jurisdiction: string;
};

/** TODO: Actually show Jurisdiction Information! */
const JurisdictionModal = ({ jurisdiction }: JurisdictionModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <InfoIcon style={{ color: 'white', float: 'right', marginRight: '5px', marginTop: '-25px', width: "18px"}}/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {jurisdiction}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
            This is the information for {jurisdiction}. Insert banger new things to learn about {jurisdiction} here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default JurisdictionModal;
