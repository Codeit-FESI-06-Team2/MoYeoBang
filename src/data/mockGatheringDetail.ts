import { GatheringDetailDTO } from '@/types/gathering.types';

export const mockGatheringDetails: GatheringDetailDTO['get'] = [
  {
    gatheringId: 1,
    hostId: 101,
    name: '코드를 그려드립니다',
    location: 'gangnam',
    themeName: '마음을 그려그립니다',
    synopsis: `모든 감정에는 고유의 색이 있다는 것을 아시나요?
    지치는 일상 속에서 점점 바래져가는 마음들.
    그리고 그 마음을 어루만져 주고자 한 사람.`,
    image: 'https://xdungeon.net/file/theme/11/11_6145641280.jpg',
    level: 'low',
    genre: 'fantasy',
    playtime: 60,
    map: '서울 강남구 강남대로84길 33, 대우디오빌플러스 B1',
    dateTime: '2025-01-15T14:30:00.000Z',
    registrationEnd: '2025-01-14T23:59:59.000Z',
    capacity: 4,
    participantCount: 2,
  },
  {
    gatheringId: 2,
    hostId: 102,
    name: 'And I met Error',
    location: 'hongdae',
    themeName: 'And I met E',
    synopsis: `'배송 완료!'
    SHINY POST가 편지 배송을 완료했다는 소리예요.
    지금부터 당신이 해야 할 일이기도 하죠.

    자 그럼 이제 시작해볼까요?`,
    image: 'https://xdungeon.net/file/theme/18/18_5563125084.png',
    level: 'middle',
    genre: 'fantasy',
    playtime: 60,
    map: '서울 마포구 와우산로29길 21, 3층',
    dateTime: '2025-01-20T18:00:00.000Z',
    registrationEnd: '2025-01-19T23:59:59.000Z',
    capacity: 6,
    participantCount: 1,
  },
  {
    gatheringId: 3,
    hostId: 103,
    name: '13동 안살아서 다행이다',
    location: 'geondae',
    themeName: 'B아파트 13동 1313',
    synopsis: `미스테리 동호회 '블랙홀'의 특별회원인 당신
      오늘밤 '블랙홀'의 첫 전국 정모가 열린다
      모임 장소는 일가족이 살해 했다는 저주받은 아파트
      일가족이 살해 당한 후 이사오는 사람마다 하루도 버티지 못하고 도망나온다는 저주받은 B아파트 13동 1313호아파트
      당신은 이곳에서 무사히 살아 나갈수 있을것인가.`,
    image:
      'https://i.postimg.cc/B6ktkgKh/theme-Kakao-Talk-Photo-2019-03-05-17-11-51-4-B-13-1313.jpg',
    level: 'high',
    genre: 'horror',
    playtime: 60,
    map: '서울 광진구 아차산로 192 지하1층',
    dateTime: '2025-01-25T13:00:00.000Z',
    registrationEnd: '2025-01-24T23:59:59.000Z',
    capacity: 5,
    participantCount: 3,
  },
];
