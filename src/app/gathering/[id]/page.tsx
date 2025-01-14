'use client';

import GatheringDetail from '@/components/gatheringDetail/GatheringDetail';

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-brand-primary px-4 py-6">
      <GatheringDetail gatherId={params.id} />
    </main>
  );
}
