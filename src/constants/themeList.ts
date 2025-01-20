interface Theme {
  label: string;
  theme: string[];
}

interface ThemeNameList {
  [key: string]: Theme;
}

export const themeNameList: ThemeNameList = {
  geondae: {
    label: '건대',
    theme: [
      '몬스터 : 10800',
      '이불밖은 위험해',
      'B아파트 13동 1313',
      '썸',
      'Make-up',
      '동화나라 수비대',
      '커튼콜',
      '생존자',
      '어제, 그리고 오늘',
    ],
  },
  hongdae: {
    label: '홍대',
    theme: [
      '이미지 세탁소',
      '경성 연쇄실종사건',
      'And I met E',
      '그달동네',
      '사라진 보물 : 대저택의 비밀',
      '날씨의 신',
      '오늘 나는',
      '꿈의 공장',
      'LET’S PLAY TOGETHER',
      '화생설화 : Blooming',
      'MST 엔터테인먼트',
      '전래동 자살사건',
    ],
  },
  hyehwa: {
    label: '혜화',
    theme: [
      '구룡 : 잠들지 않는 도시',
      '비밀의 모험',
      '슈퍼플레이어:PLAYER1',
      '엑스튜브',
      '대감댁변씨',
      '나이스',
      '크라임 시티',
      '작전명 : 옵저버',
    ],
  },
  gangnam: {
    label: '강남',
    theme: [
      '3일',
      '검은 운명의 밤',
      '響 : 향',
      'TIENTANG CITY',
      '데스티니 앤드 타로',
      'MAYDAY',
      'LOST KINGDOM2 : 대탐험의 시작',
      '강남목욕탕',
    ],
  },
};

export const locationList = [
  { value: 'all', label: '전체' },
  { value: 'geondae', label: '건대' },
  { value: 'hongdae', label: '홍대' },
  { value: 'hyehwa', label: '혜화' },
  { value: 'gangnam', label: '강남' },
];

export const genres = [
  { label: '#전체', value: 'all' },
  { label: '#미스터리', value: 'mystery' },
  { label: '#공포', value: 'horror' },
  { label: '#판타지', value: 'fantasy' },
  { label: '#코믹', value: 'comic' },
  { label: '#SF', value: 'sci-fi' },
  { label: '#드라마', value: 'drama' },
  { label: '#스릴러', value: 'thriller' },
  { label: '#로맨스', value: 'romance' },
  { label: '#잠입', value: 'stealth' },
];

export const levels = [
  { value: 'all', label: '전체' },
  { value: 'low', label: '초급' },
  { value: 'middle', label: '중급' },
  { value: 'high', label: '고급' },
];

export const levelToKorean: Record<string, string> = {
  high: '고급',
  middle: '중급',
  low: '초급',
};
