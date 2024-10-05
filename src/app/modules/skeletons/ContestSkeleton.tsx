import { useMasterContext } from '@/context/MasterContext';
import Skeleton from '@mui/material/Skeleton';

export const ContestSkeleton: React.FC = () => {
    const { isDesktop } = useMasterContext();
    
    if (isDesktop) {
        <Skeleton variant="rounded"
        className="bg-clip-border border mapbox rounded-md"
        width={516} height={326}>
            Loading...
        </Skeleton>
    }

    return (
        <Skeleton variant="rectangular"
            className="bg-clip-border border mapbox"
            width="full" height={326}>
                Loading...
        </Skeleton>
    );
}
