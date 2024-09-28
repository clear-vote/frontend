import { useMasterContext } from "@/context/MasterContext";
import { trimLink } from "@/utils/helpers";
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import { forwardRef } from "react";


interface PinnedCandidateListItemProps {
  /** The name of the Candidate */
  name: string;
  /** The Candidate's website, or null if they have none */
  website: string | null;
  /** Link to Candidate's image, null if none */
  image: string | null;
}

export const PinnedCandidateListItem = forwardRef<HTMLButtonElement, PinnedCandidateListItemProps>(({ name, website, image, ...props }, ref?) => {
  const isDesktop = useMasterContext();

  /** TODO: Fix star justification & sizing! */
  if (!isDesktop) {
    return (
      <div className="list-item rounded-md">
        <button ref={ref} {...props} className="splitscreen">
          <div className="left">
            <img src={image ? image : '/images/no_candidate_image.png'} alt={name} className="list-item-image" />
          </div>
          <div className="right">
          <StarIcon style={{ color: "#FBBF24", marginRight: "16px" }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="list-item-name font-bold">{name}</div>
            </div>
            <br />
            <div className="list-item-website">
              {website &&
                <a href={"https://" + website} className="text-sm text-gray-400"
                  style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  target="_blank">
                  <LinkIcon style={{ width: "15px", color: "gray-500" }} /> {trimLink(website)}
                </a>
              }
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="list-item rounded-md" style={{ width: "377px", height: "130px"}} key={name}>
      <button ref={ref} {...props} className="splitscreen">
        <div className="left">
          <img src={image ? image : '/images/no_candidate_image.png'} alt={name} className="list-item-image" 
          style={{height: "130px"}}/>
        </div>
        <div className="right">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="list-item-name font-bold">{name}</div>
            <StarIcon style={{ color: "#FBBF24", marginRight: "16px" }} />
          </div>
          <br></br>
          <div className="list-item-website">
            {website &&
              <div className="text-sm text-gray-400"
                style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <LinkIcon style={{ width: "15px", color: "gray-500" }} /> {trimLink(website)}
              </div>
            }
          </div>
        </div>
      </button>
    </div>
  );});