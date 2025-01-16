import { GatheringCreaterDTO } from '@/types/gathering.types';
import MyGatheringCard from '../mypage/myGatheringCard';
import EmptyElement from '../@shared/EmptyElement';
import MyCreateGatheringDetail from '../mypage/myGatheringCard/myCreateGatheringDetail';

interface GatheringCreaterProfileGatheringListProps {
  createrGatheringList: GatheringCreaterDTO['get']['gatherings'];
}
export default function GatheringCreaterProfileGatheringList({
  createrGatheringList,
}: GatheringCreaterProfileGatheringListProps) {
  if (!createrGatheringList || createrGatheringList.length === 0) {
    return <EmptyElement>아직 만든 모임이 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {createrGatheringList.map((gathering: any) => (
        <MyGatheringCard key={gathering.gatheringId} image={gathering.image}>
          <MyCreateGatheringDetail
            location={gathering.location}
            dateTime={gathering.dateTime}
            name={gathering.name}
            themeName={gathering.themeName}
            capacity={gathering.capacity}
            participantCount={gathering.participantCount}
          />
        </MyGatheringCard>
      ))}
    </div>
  );
}
