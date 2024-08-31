import React, { forwardRef } from 'react';
import { trimLink } from "@/utils/index";
import { Button } from "@/components/ui/button";


interface CandidateListItemProps {
  /** The name of the Candidate */
  name: string;
  /** The Candidate's website, or null if they have none */
  website: string | null;
  /** Link to Candidate's image, null if none */
  image: string | null;
}

/** TODO: Make Candidate List Items look better and fix minor formatting issues */
export const CandidateListItem = forwardRef<HTMLButtonElement, CandidateListItemProps>(
  ({ name, website, image, ...props }, ref?) => {
    return (
      <div className="list-item rounded-md">
        <button ref={ref} {...props} className="splitscreen">
          <div className="left">
            <img src={image ? image : '/images/no_candidate_image.png'} alt={name} className="list-item-image" />
          </div>
          <div className="right">
            <div className="list-item-name"><p className="font-bold">{name}</p></div>
            <br></br>
            <div className="list-item-website">
              {website &&
                <span className="text-sm text-gray-500">{trimLink(website)}</span>
              }
            </div>
          </div>
        </button>
      </div>
    );
  }
);
