import React, { forwardRef } from 'react';
import { trimLink } from "@/utils/index";
import { Button } from "@/components/ui/button";

interface CandidateListItemProps {
  name: string;
  website: string|null;
}

// TODO: needs to be styled differently
export const CandidateListItem = forwardRef<HTMLButtonElement, CandidateListItemProps>(
  ({ name, website, ...props }, ref) => {
    return (
      <Button ref={ref} variant="outline" {...props} className="flex flex-col items-start">
        <span className="font-bold">{name}</span>
        {website && 
          <span className="text-sm text-gray-500">{trimLink(website)}</span>
        }
      </Button>
    );
  }
);
