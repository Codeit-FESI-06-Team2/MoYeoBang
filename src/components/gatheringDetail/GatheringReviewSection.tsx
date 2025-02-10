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
              star <= score ? '/icons/heart_full.svg' : '/icons/heart_empty.svg'
            }
            width={16}
            height={16}
            alt=""
            className="h-4 w-4"
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section>
        <div className="border-t border-secondary-80" />
        <h2 className="font-noto mt-6 text-[26px] leading-[28px]">
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
      <section>
        <div className="border-t border-secondary-80" />
        <h2 className="font-noto mt-6 text-[26px] leading-[28px]">
          방탈출 리뷰
        </h2>
        <div className="mt-4 flex items-center justify-center">
          <p>리뷰를 불러오는데 실패했습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* 구분선 */}
      <div className="border-t border-secondary-80" />

      {/* 제목 */}
      <h2 className="font-noto mt-6 text-[26px] leading-[28px]">방탈출 리뷰</h2>

      {/* 리뷰 목록 */}
      <div className="mt-6 space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="rounded-xl bg-secondary-90 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={review.user.image || '/profile_image_default.png'}
                    width={40}
                    height={40}
                    alt="프로필 이미지"
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{review.user.nickname}</p>
                    {renderStars(review.score)}
                  </div>
                </div>
                <span className="text-sm text-secondary-50">
                  {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="mt-3 text-sm text-secondary-30">{review.comment}</p>
            </div>
          ))
        ) : (
          <EmptyElement>아직 리뷰가 없습니다.</EmptyElement>
        )}
      </div>
    </section>
  );
}
