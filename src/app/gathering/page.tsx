import { Suspense } from 'react';

import HeaderTitle from '@/components/@shared/HeaderTitle';
import AddGatheringButton from '@/components/gathering/UI/AddGatheringButton';
import GatheringList from '@/components/gathering/GatheringList';
import Spinner from '@/components/@shared/Spinner';

export default function Gathering() {
  return (
    <div className="flex h-full w-full flex-col gap-12 px-4 pb-12 pt-24 md:px-6 md:pt-32 xl:mx-auto xl:max-w-[1166px] xl:px-0">
      <HeaderTitle
        title="모임 찾기"
        h1="지금 여기로 모여방"
        content="함께 할 사람이 없나요?"
        order="inverse"
      />
      <main className="flex flex-col gap-10 md:gap-12 ">
        <Suspense fallback={<Spinner />}>
          <GatheringList />
        </Suspense>
        <AddGatheringButton />
      </main>
    </div>
  );
}
