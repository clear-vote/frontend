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
          <p>The Politigram is a 5-dimensional representation of a candidate&apos;s political values.</p>
          <br/>
          <p>We determine this by processing the candidate&apos;s provided statements through a Large Language Model (Artificial Intelligence) that outputs a composite rating for each metric on dozens of qualities</p>
          <br/>
          <p>
            {getPolitigramInfo(politigram)} You can learn more at this <span> </span>
            <a 
              href="https://medium.com/clearvote/the-need-for-better-measurements-in-politics-20c0e699f290" 
              style={{ textDecoration: 'underline' }} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              blog post
            </a>
          </p>        
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PolitigramInfoModal;