export interface GatheringFilters {
  location?: string;
  date?: string;
  genre?: string;
  level?: string;
}

// UrlParams
export interface GatheringUrlParams extends GatheringFilters {
  sortBy?: string;
  sortOrder?: string;
  keyword?: string;
  limit?: number;
  offset?: number;
}

export interface SearchGatheringParams {
  keyword: string;
}

export interface SurveyUrlParams {
  name: string;
  genre: string;
  playtime: string;
  level: string;
  location: string;
}

// Response
export interface GatheringDto {
  get: {
    gatheringId: number;
    userId: number;
    name: string;
    location: 'geondae' | 'hongdae' | 'hyehwa' | 'gangnam';
    themeName: string;
    image: string;
    level: 'low' | 'middle' | 'high';
    genre:
      | 'mystery'
      | 'horror'
      | 'fantasy'
      | 'comic'
      | 'sci-fi'
      | 'drama'
      | 'thriller'
      | 'stealth'
      | 'adventure';
    playtime: number;
    map: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
    participantCount: number;
    isCanceled: boolean;
  };
}

// Request
export interface GatheringRequestBody {
  post: {
    name: string;
    message: string;
    location: string;
    themeName: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
  };
  patch: {
    gatheringId: number;
    name: string;
    message: string;
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
    capacity: number;
    participantCount: number;
    image: string;
  };
  badge: {
    icon?: 'high' | 'middle' | 'low';
    shape?: 'default' | 'round';
    variant?: 'primary' | 'secondary' | 'tertiary';
    border?: 'primary';
    fontColor?: 'primary' | 'secondary';
    className?: string;
    children: React.ReactNode;
  };
  slot: {
    gatheringId: number;
    registrationEnd: string;
    name: string;
    capacity: string;
    participantCount: string;
    image: string;
  };
}

export interface LikesGatheringListProps {
  likesGatherings: {
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
  }[];
}

export interface GatheringCreaterDTO {
  get: {
    email: string;
    nickname: string;
    image: string;
    gatherings: {
      gatheringId: number;
      name: string;
      location: string;
      themeName: string;
      image: string;
      dateTime: string;
      capacity: number;
      participantCount: number;
    }[];
    // reviews: [
    //   {
    //     reviewId: number;
    //     gatheringId: number;
    //     score: number;
    //     comment: string;
    //     createdAt: string;
    //   },
    // ];
  };
}

export interface GatheringDetailDTO {
  get: {
    gatheringId: number;
    hostId: number;
    name: string;
    location: string;
    themeName: string;
    synopsis: string;
    image: string;
    level: string;
    genre: string;
    playtime: number;
    map: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
    participantCount: number;
  }[];
}
