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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getJurisdictionLevelDescription } from '@/utils/informationals';

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
        <InfoOutlinedIcon style={{ color: 'white', float: 'right', marginRight: '5px', marginTop: '-24px', width: "18px"}}/>
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
