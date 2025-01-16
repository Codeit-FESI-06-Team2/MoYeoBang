import { mockGatherings } from '@/data/mockGatherings';

import Image from 'next/image';

import Links from '@/components/home/Links';
import LinkButton from '@/components/@shared/LinkButton';
import NearFullCapacities from '@/components/home/NearFullCapacities';
import NearDeadlines from '@/components/home/NearDeadlines';

export default function Home() {
  const gatherings = mockGatherings;

  return (
    <>
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 md:gap-20 md:pb-24 md:pt-28 xl:px-0 xl:pb-32 xl:pt-32">
        <header className="flex w-full flex-col items-center gap-2 text-white">
          <Image
            src="/images/puzzle_banner.png"
            alt="홈 상단 배너 이미지"
            width={1166}
            height={288}
            quality={100}
            className="max-h-full max-w-full rounded-3xl"
          />
        </header>
        <main className="flex flex-col items-center gap-12 md:gap-20">
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="text-sm font-medium">함께 할 사람이 없나요?</h2>
            <h1 className="text-2xl font-semibold">지금 여기로 모여방</h1>
          </div>
          <NearFullCapacities gatherings={gatherings} />
          <LinkButton href="/gathering" variant="dark" size="long">
            모여방 더보기
          </LinkButton>
        </main>
      </div>
      <NearDeadlines gatherings={gatherings} />
      <Links />
    </>
  );
}
