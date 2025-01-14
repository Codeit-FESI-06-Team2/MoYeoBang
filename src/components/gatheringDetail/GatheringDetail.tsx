'use client';

interface GatheringDetailProps {
  gatherId: string;
}

export default function GatheringDetail({ gatherId }: GatheringDetailProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-4">
      {/* 모임 상세 정보 섹션 */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">모임 제목</h1>
        {/* 호스트 정보, 모임 기본 정보 등 */}
      </section>

      {/* 모임 설명 섹션 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-text-primary">모임 설명</h2>
        {/* 상세 설명 내용 */}
      </section>

      {/* 참여자 목록 섹션 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-text-primary">참여자</h2>
        {/* 참여자 리스트 */}
      </section>
    </div>
  );
}
