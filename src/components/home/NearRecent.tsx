'use client';

import EmptyElement from '@/components/@shared/EmptyElement';
import GatheringCard from '@/components/gathering/GatheringCard';

export default function NearRecent({ gatherings }: { gatherings: any[] }) {
  return (
    <div className="w-full">
      {gatherings.length > 0 ? (
        <div className="grid h-full w-full grid-cols-1 grid-rows-2 gap-4 md:gap-7 xl:grid-cols-2 xl:grid-rows-2 xl:gap-9">
          {gatherings.map((gathering) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
        </div>
      ) : (
        <EmptyElement className="w-full">
          모집 중인 모임을 불러오지 못했어요.
        </EmptyElement>
      )}
    </div>
  );
}
