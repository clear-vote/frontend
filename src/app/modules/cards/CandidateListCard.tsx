import React, { forwardRef } from 'react';
import Image from 'next/image';
import { trimLink } from "@/utils/helpers";
import LinkIcon from '@mui/icons-material/Link';
import { useMasterContext } from '@/context/MasterContext';


interface CandidateListItemProps {
  /** The name of the Candidate */
  name: string;
  /** The Candidate's website, or null if they have none */
  website: string | null;
  /** Link to Candidate's image, null if none */
  image: string | null;
}

export const CandidateListItem = forwardRef<HTMLButtonElement, CandidateListItemProps>(({ name, website, image, ...props }, ref?) => {

  const { isDesktop } = useMasterContext();

  if (isDesktop) {
      return (
        <div className="list-item rounded-md" style={{ width: "90%"}} onClick={() => ref} {...props}>
          <button className="splitscreen">
            <div className="left">
              <img 
                src={image ? image : '/images/no_candidate_image.png'} 
                alt={name} 
                className="list-item-image" 
                onError={(e) => { e.currentTarget.src = '/images/no_candidate_image.png'; }} 
              />
            </div>
            <div className="right">
              <div className="list-item-name"><h1 className="font-bold">{name}</h1></div>
              <br></br>
              <div className="list-item-website hover:bg-gray-200">
                {website &&
                  <a href={"https://" + website} className="text-sm text-gray-400" 
                  style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                  target="_blank">
                    <LinkIcon style={{width: "15px", color: "gray-500"}}/> {trimLink(website)}
                  </a>
                }
              </div>
            </div>
          </button>
        </div>
      );
    }

    return (
      <div className="list-item rounded-md" onClick={() => ref} {...props}>
        <button className="splitscreen">
        <div className="left">
              <img 
                src={image ? image : '/images/no_candidate_image.png'} 
                alt={name} 
                className="list-item-image" 
                onError={(e) => { e.currentTarget.src = '/images/no_candidate_image.png'; }} 
              />
            </div>
          <div className="right">
            <div className="list-item-name"><h1 className="font-bold">{name}</h1></div>
            <br></br>
            <div className="list-item-website">
              {website &&
                <div className="text-sm text-gray-400" 
                style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  <LinkIcon style={{width: "15px", color: "gray-500"}}/> {trimLink(website)}
                </div>
              }
            </div>
          </div>
        </button>
      </div>
    );
  }
);

CandidateListItem.displayName = 'PinnedCandidateListCard';
