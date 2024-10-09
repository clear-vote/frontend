import { Politigram } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { getPolitigramInfo } from "@/utils/informationals";

type PolitigramInfoModalProps = {
  politigram: Politigram;
};

const PolitigramInfoModal = ({ politigram }: PolitigramInfoModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex justify-center font-bold" style={{width: "98%"}}>
          <HelpOutlineRoundedIcon />&nbsp;Learn More
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {politigram.charAt(0).toUpperCase() + politigram.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>The one-dimensional political binary represents local candidates poorly.</p>
          <p>The Politigram is a 5-dimensional representation of a candidate&apos;s political values.</p>
          <p>We determine this by processing the candidate&apos;s provided statements into an Large Language Model (Artificial Intelligence) that outputs a composite rating for each metric on dozens of qualities</p>
          <p>{getPolitigramInfo(politigram)}</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PolitigramInfoModal;