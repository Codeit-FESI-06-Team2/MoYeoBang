import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ReviewDto } from '@/types/review.types';
import { getGatheringReviews } from '@/axios/gather/apis';
import EmptyElement from '@/components/@shared/EmptyElement';

interface GatheringReviewSectionProps {
  gatheringId: number;
}

export default function GatheringReviewSection({
  gatheringId,
}: GatheringReviewSectionProps) {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery<ReviewDto['get'][]>({
    queryKey: ['gathering-reviews', gatheringId],
    queryFn: () => getGatheringReviews(gatheringId),
    enabled: !!gatheringId,
  });

  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            src={
              star <= score ? '/icons/HeartFull.svg' : '/icons/heart_empty.svg'
            }
            width={16}
            height={16}
            alt=""
            className="h-3 w-3 md:h-4 md:w-4"
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="w-full max-w-[326px] sm:max-w-[688px] lg:max-w-[805px]">
        <div className="border-t border-secondary-80" />
        <h2 className="mt-6 text-xl leading-[28px] md:text-2xl lg:text-[26px]">
          방탈출 리뷰
        </h2>
        <div className="mt-4 flex items-center justify-center">
          <p>로딩중...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full max-w-[326px] sm:max-w-[688px] lg:max-w-[805px]">
        <div className="border-t border-secondary-80" />
        <h2 className="mt-6 text-xl leading-[28px] md:text-2xl lg:text-[26px]">
          방탈출 리뷰
        </h2>
        <div className="mt-4 flex items-center justify-center">
          <p>리뷰를 불러오는데 실패했습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[326px] sm:max-w-[688px] lg:max-w-[805px]">
      <div className="my-5 w-full border-t border-secondary-80" />
      <h2 className="mt-6 text-xl leading-[28px] md:text-2xl lg:text-[26px]">
        방탈출 리뷰
      </h2>

      <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="rounded-xl bg-secondary-90 p-3 md:p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <Image
                    src={review.user.image || '/profile_image_default.png'}
                    width={40}
                    height={40}
                    alt="프로필 이미지"
                    className="h-8 w-8 rounded-full md:h-10 md:w-10"
                  />
                  <div>
                    <p className="text-sm font-medium md:text-base">
                      {review.user.nickname}
                    </p>
                    {renderStars(review.score)}
                  </div>
                </div>
                <span className="text-xs text-secondary-50 md:text-sm">
                  {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary-30 md:mt-3 md:text-sm">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <EmptyElement>
            <span className="text-sm md:text-base">아직 리뷰가 없습니다.</span>
          </EmptyElement>
        )}
      </div>
    </section>
  );
}
