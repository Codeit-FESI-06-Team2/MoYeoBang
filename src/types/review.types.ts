export interface ReviewDto {
  get: {
    [x: string]: any;
    reviewId?: number;
    score: number; // 리뷰 점수
    comment: string; // 리뷰 내용
    createdAt: string; // 리뷰 생성 날짜
    Gathering: {
      gatheringId: number;
      location: string; // 방탈출 테마 지역
      themeName: string; // 방탈출 테마 이름
      image: string; // 방탈출 테마 이미지
      genre: string; // 장르
      participantCount: number; // 참여 인원
    };
    User: {
      userId: number;
      nickname: string; // 리뷰 작성자 이름
      image: string; // 리뷰 작성자 이미지
    };
  };
}

export interface ReviewRatingDto {
  get: {
    genre?: string; // 장르
    totalScore: number; // 총 스코어 갯수
    averageScore: number; // 평균 스코어
    Score: number[];
  };
}

export interface AllReviewListProps {
  allReviews: {
    reviewId?: number;
    score: number; // 리뷰 점수
    comment: string; // 리뷰 내용
    createdAt: string; // 리뷰 생성 날짜
    gathering: {
      gatheringId: number;
      location: string; // 방탈출 테마 지역
      themeName: string; // 방탈출 테마 이름
      image: string; // 방탈출 테마 이미지
      genre: string; // 장르
      participantCount: number; // 참여 인원
    };
    user: {
      userId: number;
      nickname: string; // 리뷰 작성자 이름
      image: string; // 리뷰 작성자 이미지
    };
  }[];
}
