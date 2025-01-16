import { GatheringCreaterDTO } from '@/types/gathering.types';

export const mockGatheringCreater: GatheringCreaterDTO['get'] = {
  email: 'moyeobangtester@naver.com', // 사용자 아이디
  nickname: '모여방테스터', // 사용자 별명
  image: '', // 사용자 이미지
  gatherings: [
    {
      gatheringId: 1,
      name: '코드를 그려드립니다',
      location: 'gangnam',
      themeName: '마음을 그려그립니다',
      image: 'https://xdungeon.net/file/theme/11/11_6145641280.jpg',
      dateTime: '2025-01-15T14:30:00.000Z',
      capacity: 4,
      participantCount: 2,
    },
    {
      gatheringId: 2,
      name: 'And I met Error',
      location: 'hongdae',
      themeName: 'And I met E',
      image: 'https://xdungeon.net/file/theme/18/18_5563125084.png',
      dateTime: '2025-01-20T18:00:00.000Z',
      capacity: 6,
      participantCount: 1,
    },
    {
      gatheringId: 3,
      name: '13동 안살아서 다행이다',
      location: 'geondae',
      themeName: 'B아파트 13동 1313',
      image:
        'https://i.postimg.cc/B6ktkgKh/theme-Kakao-Talk-Photo-2019-03-05-17-11-51-4-B-13-1313.jpg',
      dateTime: '2025-01-25T13:00:00.000Z',
      capacity: 5,
      participantCount: 3,
    },
  ],
};
