import { Suspense } from 'react';

import {
  getGatheringsDateTime,
  getGatheringsByRegistrationEnd,
} from '@/axios/gather/apis';

import SkeletonCardList from '@/components/@shared/skeleton/SkeletonCardList';
import SkeletonSlotList from '@/components/@shared/skeleton/SkeletonSlotList';
import Carousel from '@/components/home/UI/Carousel';
import Links from '@/components/home/Links';
import LinkButton from '@/components/@shared/button/LinkButton';
import NearRecent from '@/components/home/NearRecent';
import NearDeadlines from '@/components/home/NearDeadlines';

export default async function Home() {
  const gatheringsDateTime = await getGatheringsDateTime();
  const gatheringsRegistrationEnd = await getGatheringsByRegistrationEnd();

  return (
    <>
      <main className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 md:gap-20 md:pb-24 md:pt-28 xl:px-0 xl:pb-32 xl:pt-32">
        <Carousel />
        <section className="flex flex-col items-center gap-12 md:gap-20">
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="text-sm font-medium">함께 할 사람이 없나요?</h2>
            <h1 className="text-2xl font-semibold">지금 여기로 모여방</h1>
          </div>
          <Suspense fallback={<SkeletonCardList />}>
            <NearRecent gatherings={gatheringsDateTime} />
          </Suspense>
          <LinkButton href="/gathering" variant="dark" size="long">
            모여방 더보기
          </LinkButton>
        </section>
      </main>
      <Suspense fallback={<SkeletonSlotList />}>
        <NearDeadlines gatherings={gatheringsRegistrationEnd} />
      </Suspense>
      <Links />
    </>
  );
}
