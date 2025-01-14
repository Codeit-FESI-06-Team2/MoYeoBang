import { mockReviews } from '@/data/mockReviews';
import { hyphenYearMonthDay } from '@/utils/dateUtils';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';

interface ReviewSectionProps {
  selectedGenre: string;
  selectedLocation: string;
  selectedDate: string;
  onLocatingChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function ReviewSection({
  selectedGenre = 'all',
  selectedLocation = 'all',
  selectedDate = '',
  onLocatingChange,
  onDateChange,
}: ReviewSectionProps) {
  const filteredReviews = mockReviews.filter((review) => {
    const genreMatches =
      selectedGenre === 'all' || review.Gathering.genre === selectedGenre;
    const locationMatches =
      selectedLocation === 'all' ||
      review.Gathering.location === selectedLocation;
    const dateMatches =
      selectedDate === '' ||
      hyphenYearMonthDay(review.createdAt) === selectedDate;
    return genreMatches && locationMatches && dateMatches;
  });

  return (
    <>
      <ReviewFilters
        onLocatingChange={onLocatingChange}
        onDateChange={onDateChange}
      />
      <div key={selectedGenre} className="mt-10 flex flex-col gap-6">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            score={review.score}
            comment={review.comment}
            createdAt={review.createdAt}
            Gathering={review.Gathering}
            User={review.User}
          />
        ))}
      </div>
    </>
  );
}
