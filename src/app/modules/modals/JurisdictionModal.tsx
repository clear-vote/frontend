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
import InfoIcon from '@mui/icons-material/Info';
import { getJurisdictionLevelDescription } from '@/utils/informationals';

import { IconButton } from '@mui/material';

type JurisdictionModalProps = {
  jurisdiction: string;
};

/** TODO: Actually show Jurisdiction Information! */
const JurisdictionModal = ({ jurisdiction }: JurisdictionModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const jurisdictionDescription = getJurisdictionLevelDescription(jurisdiction);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <InfoIcon 
          fontSize="small" 
          sx={{ 
            color: 'white',
            '&:hover': { color: 'lightgray', cursor: 'pointer' } 
          }} />
        {/* <IconButton color="primary" aria-label="info" component="span"
              sx={{ "&:hover": { color: "blue" } }}> </IconButton> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {jurisdiction}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {jurisdictionDescription}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default JurisdictionModal;
