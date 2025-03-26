import { Suspense } from 'react';

import SkeletonCardList from '@/components/@shared/skeleton/SkeletonCardList';
import SkeletonSlotList from '@/components/@shared/skeleton/SkeletonSlotList';
import Carousel from '@/components/home/UI/Carousel';
import Links from '@/components/home/Links';
import LinkButton from '@/components/@shared/button/LinkButton';
import NearRecentSection from '@/components/home/NearRecentSection';
import NearDeadlinesSection from '@/components/home/NearDeadlinesSection';

export default function Home() {
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
            <NearRecentSection />
          </Suspense>
          <LinkButton href="/gathering" variant="dark" size="long">
            모여방 더보기
          </LinkButton>
        </section>
      </main>
      <Suspense fallback={<SkeletonSlotList />}>
        <NearDeadlinesSection />
      </Suspense>
      <Links />
    </>
  );
}
