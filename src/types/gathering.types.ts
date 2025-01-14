export interface GatheringParams {
  sortBy: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder: 'asc' | 'desc';
  keyword: string;
  location: string;
  dateTime: string;
  genre: string;
}

// Response
export interface GatheringDto {
  get: {
    gatheringId: number;
    userId: number;
    name: string;
    location: string;
    themeName: string;
    image: string;
    level: string;
    genre: string;
    playtime: number;
    map: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
    participantCount: number;
  };
}

// Request
export interface GatheringRequestBody {
  post: {
    name: string;
    location: string;
    themeName: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
  };
  patch: {
    gatheringId: number;
    name: string;
    location: string;
    themeName: string;
    dateTime: string;
    registrationEnd: string;
  };
  delete: {
    gatheringId: number;
  };
}

// Component's props
export interface GatheringProps {
  card: {
    gatheringId: number;
    location: string;
    dateTime: string;
    registrationEnd: string;
    level: string;
    name: string;
    themeName: string;
    capacity: string;
    participantCount: string;
    image: string;
  };
  badge: {
    icon?: '고급' | '중급' | '초급';
    shape?: 'default' | 'round';
    variant?: 'primary' | 'secondary' | 'tertiary';
    className?: string;
    children: React.ReactNode;
  };
}
