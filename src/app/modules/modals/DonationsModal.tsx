import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useState } from "react";



export const DonationsModal = () => {

const [isDialogOpen, setIsDialogOpen] = useState(false);

    /** TODO: Add donation stuff! */
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          Help support Clearvote!
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Donate yo
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Help us with our cause!
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};