import { levels } from '@/constants/themeList';
import Image from 'next/image';

interface GatheringDetailSectionProps {
  message: string;
  synopsis: string;
  level: string;
  themeName: string;
  playtime: number;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
}

export default function GatheringDetailSection({
  message,
  synopsis,
  level,
  themeName,
  playtime,
  dateTime,
  registrationEnd,
  capacity,
  participantCount,
}: GatheringDetailSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const levelsLabel =
    levels.find((item) => item.value === level)?.label || level;

  return (
    <section className="w-full max-w-[326px] space-y-6 sm:max-w-[688px] lg:max-w-[805px]">
      {/* 방탈출 정보 섹션 */}
      <div>
        <h2 className="mb-4 text-xl leading-6 md:text-2xl md:leading-7 lg:text-[26px] lg:leading-[28px]">
          방탈출 정보
        </h2>
        <div className="space-y-4 rounded-xl bg-[#2A2B2E] p-4 md:space-y-6 md:p-5 lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              테마명
            </h3>
            <span className="text-sm md:text-base">{themeName}</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              시놉시스
            </h3>
            <p className="whitespace-pre-line text-sm md:text-base">
              {synopsis}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              플레이타임
            </h3>
            <span className="text-sm md:text-base">{playtime}분</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              난이도
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base">{levelsLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 모임 안내 섹션 */}
      <div>
        <h2 className="mb-4 text-xl leading-6 md:text-2xl md:leading-7 lg:text-[26px] lg:leading-[28px]">
          모임 안내
        </h2>
        <div className="space-y-4 rounded-xl bg-[#2A2B2E] p-4 md:space-y-6 md:p-5 lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              모집글
            </h3>
            <span className="text-sm md:text-base">{message}</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              모임 일시
            </h3>
            <span className="text-sm md:text-base">{formatDate(dateTime)}</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              신청 마감
            </h3>
            <span className="text-sm md:text-base">
              {formatDate(registrationEnd)}
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              모임 정원
            </h3>
            <span className="text-sm md:text-base">{capacity}명</span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h3 className="min-w-[80px] text-secondary-50 sm:min-w-[100px]">
              참여 유저
            </h3>
            <div className="flex -space-x-2">
              {Array.from({ length: participantCount }, (_, i) => (
                <div
                  key={`participant-${i}`}
                  className="relative h-6 w-6 rounded-full border-2 border-secondary-90 bg-secondary-90 md:h-8 md:w-8"
                >
                  <Image
                    src="/icons/profile_image_default.svg"
                    alt={`참여자 ${i + 1}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
