export const INIT_GATHERING = {
  POST: {
    name: '',
    message: '',
    location: '',
    themeName: '',
    dateTime: '',
    registrationEnd: '',
    capacity: 2,
  },
  PATCH: {
    gatheringId: 0,
    name: '',
    message: '',
    location: '',
    themeName: '',
    dateTime: '',
    registrationEnd: '',
  },
  DELETE: {
    gatheringId: 0,
  },
  SORT: {
    sortBy: 'dateTime',
    sortOrder: 'asc',
  },
  FILTER: {
    genre: '',
    location: '',
    date: '',
    level: '',
  },
};
