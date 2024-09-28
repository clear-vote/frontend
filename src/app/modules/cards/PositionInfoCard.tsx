import { getPositionInfo } from '@/utils/informationals';

interface PositionInfoCardProps {
    position: string;
}


const PositionInfoCard = ({ position }: PositionInfoCardProps) => {
    return (
        <div className="rounded-md py-1 px-2" style={{ border: "2px solid #E5E7EB", maxWidth: "400px" }}>
            <div className="font-bold" style={{ background: 'white'}}>
            <h3 className="text-xl">About This Position</h3>
            <br/>
            <p className="font-normal">{getPositionInfo(position)}</p>
        </div>
        </div>

    );
}

export default PositionInfoCard;