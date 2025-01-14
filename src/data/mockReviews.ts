import { ReviewDto } from '@/types/review.types';

export const mockReviews: ReviewDto['get'][] = [
  {
    reviewId: 1,
    score: 3, // 리뷰 점수
    comment:
      '장치와 자물쇠의 비율이 적당해요. 방탈출 초보들이 하기에는 난이도가 있지만 힌트 무제한이라 시간이 많이 갔다 싶으면 주저하지말고 힌트 쓰세요. 1시간동안 재밌게 놀았습니다. 다음엔 꼭 탈출할래요~', // 리뷰 내용
    createdAt: '2025-01-15T14:30:00.000Z', // 리뷰 생성 날짜
    Gathering: {
      gatheringId: 1,
      location: 'gangnam', // 방탈출 테마 지역
      themeName: '마음을 그려드립니다.', // 방탈출 테마 이름
      image: 'https://xdungeon.net/file/theme/11/11_6145641280.jpg', // 방탈출 테마 이미지
      genre: 'fantasy', // 장르
      participantCount: 4, // 참여 인원
    },
    User: {
      userId: 101,
      nickname: '모여방테스터', // 리뷰 작성자 이름
      image:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MTBfMTY1%2FMDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute%2Fuser.png&type=sc960_832', // 리뷰 작성자 이미지
    },
  },
  {
    reviewId: 2,
    score: 4, // 리뷰 점수
    comment: '연기자가 나오는 연출은 처음입니다!! 최고의 경험', // 리뷰 내용
    createdAt: '2025-01-16T14:30:00.000Z', // 리뷰 생성 날짜
    Gathering: {
      gatheringId: 2,
      location: 'hongdae', // 방탈출 테마 지역
      themeName: 'And I met E', // 방탈출 테마 이름
      image: 'https://xdungeon.net/file/theme/18/18_5563125084.png', // 방탈출 테마 이미지
      genre: 'fantasy', // 장르
      participantCount: 1, // 참여 인원
    },
    User: {
      userId: 101,
      nickname: '모여방테스터', // 리뷰 작성자 이름
      image:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MTBfMTY1%2FMDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute%2Fuser.png&type=sc960_832', // 리뷰 작성자 이미지
    },
  },
  {
    reviewId: 3,
    score: 1, // 리뷰 점수
    comment: '역시 저는 공포와 맞지 않는 것 같습니다...ㅠ', // 리뷰 내용
    createdAt: '2025-01-17T14:30:00.000Z', // 리뷰 생성 날짜
    Gathering: {
      gatheringId: 3,
      location: 'geondae', // 방탈출 테마 지역
      themeName: 'B아파트 13동 1313', // 방탈출 테마 이름
      image:
        'https://i.postimg.cc/B6ktkgKh/theme-Kakao-Talk-Photo-2019-03-05-17-11-51-4-B-13-1313.jpg', // 방탈출 테마 이미지
      genre: 'horror', // 장르
      participantCount: 3, // 참여 인원
    },
    User: {
      userId: 101,
      nickname: '모여방테스터', // 리뷰 작성자 이름
      image:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MTBfMTY1%2FMDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute%2Fuser.png&type=sc960_832', // 리뷰 작성자 이미지
    },
  },
];
