import { getPositionInfo } from '@/utils/informationals';

interface PositionInfoCardProps {
    position: string;
}


const PositionInfoCard = ({ position }: PositionInfoCardProps) => {
    return (
        <div className="rounded-md py-1 px-2" style={{ border: "2px solid #E5E7EB", maxWidth: "375px" }}>
            <div className="font-bold px-2 py-1" style={{ background: 'white' }}>
                <h3 className="text-2xl">About This Position</h3>
                <p className="font-normal py-1">{getPositionInfo(position)}</p>
            </div>
        </div>

    );
}

export default PositionInfoCard;