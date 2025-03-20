import { authAxiosInstance } from '@/axios/axiosInstance';
import { apiCall } from '@/utils/apiCall';
import type {
  GatheringRequestBody,
  GatheringUrlParams,
} from '@/types/gathering.types';
import { API_PATH } from '../config/path';

// 홈페이지 모임 목록 (registrationEnd 기준)
export const getGatheringsByRegistrationEnd = async () => {
  const params: GatheringUrlParams = {
    limit: 6,
    sortOrder: 'asc',
    sortBy: 'registrationEnd',
  };

  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 홈페이지 모임 목록 (dateTime 기준)
export const getGatheringsDateTime = async () => {
  const params: GatheringUrlParams = {
    limit: 4,
    sortOrder: 'asc',
    sortBy: 'dateTime',
  };

  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 모임 목록
export const getGatherings = async (params: GatheringUrlParams) => {
  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 모임 생성
export const postGathering = async (data: GatheringRequestBody['post']) => {
  return authAxiosInstance.post(API_PATH.gathering.default, data);
};

// 모임 상세 정보 조회
export const getGatheringDetail = (gatheringId: number) => {
  return apiCall(
    'get',
    `${API_PATH.gathering.default}/${gatheringId}`,
    null,
    {}
  );
};

// 모임 주최자 프로필 조회
export const getHostProfile = (hostId: number) => {
  return apiCall('get', `${API_PATH.user}/${hostId}/profile`, null, {});
};

export const getGatheringReviews = (gatheringId: number) => {
  return apiCall(
    'get',
    `${API_PATH.review.default}?gatheringId=${gatheringId}`,
    null,
    {}
  );
};

export const checkParticipationStatus = (gatheringId: number) => {
  return authAxiosInstance.get(
    // publicAxiosInstance 대신 authAxiosInstance 사용
    `${API_PATH.gathering.participant(gatheringId)}/status`
  );
};

// 모임 참여하기
export const participateGathering = async (gatheringId: number) => {
  return authAxiosInstance.post(API_PATH.gathering.participant(gatheringId));
};

// 모임 참여 취소하기
export const cancelParticipation = async (gatheringId: number) => {
  return authAxiosInstance.delete(API_PATH.gathering.participant(gatheringId));
};
