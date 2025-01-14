import CreateGatheringBtn from '@/components/gathering/CreateGatheringBtn';
import GatheringCard from '@/components/gathering/GatheringCard';
import GatheringFilters from '@/components/gathering/GatheringFilters';
import GenreFilters from '@/components/gathering/GenreFilters';

import { mockGatherings } from '@/data/mockGatherings';

export default function Gathering() {
  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 py-32 md:py-48">
      <header className="mx-1 flex flex-col gap-2 text-white xl:mx-5">
        <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
        <h1 className="text-2xl font-semibold">지금 여기로 모여방</h1>
      </header>
      <main className="flex flex-col gap-10 md:gap-12">
        <section className="mx-1 flex flex-col xl:mx-5">
          <div className="flex flex-col gap-6">
            <GenreFilters />
            <div className="flex justify-between text-text-secondary">
              <GatheringFilters />
              <ul>정렬</ul>
            </div>
          </div>
        </section>

        <section className="mx-auto grid h-full w-full grid-cols-1 gap-3 text-white xl:grid-cols-2">
          {mockGatherings.map((gathering: any) => (
            <GatheringCard key={gathering.gatheringId} {...gathering} />
          ))}
        </section>
        <CreateGatheringBtn />
      </main>
    </div>
  );
}
