import { publicAxiosInstance, authAxiosInstance } from '@/axios/axiosInstance';
import qs from 'qs';

type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

// 공통 apiCall 함수
export const apiCall = async (
  method: HttpMethod,
  url: string,
  data: any = null,
  config: Record<string, any> = {}
) => {
  try {
    const { params: queryParams, ...axiosConfig } = config;

    const axiosInstance =
      method === 'get' ? publicAxiosInstance : authAxiosInstance;

    // 현재 URL이 상대 경로인지 확인
    const baseURL = publicAxiosInstance.defaults.baseURL ?? '';
    const isRelativeUrl = url.startsWith('/');

    // 절대 URL로 변환
    const finalUrl = isRelativeUrl ? `${baseURL}${url}` : url;

    // TEST:쿼리 문자열 생성
    const queryString = qs.stringify(queryParams, {
      skipNulls: true,
      arrayFormat: 'brackets',
      filter: (prefix, value) => (value === '' ? undefined : value),
    });

    // TEST: 최종 URL
    const fullUrl = queryString ? `${finalUrl}?${queryString}` : finalUrl;
    console.log('Full URL:', fullUrl);

    const response = await axiosInstance[method](finalUrl, data, {
      ...axiosConfig,
      params: queryParams,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          skipNulls: true,
          arrayFormat: 'brackets',
          filter: (prefix, value) => (value === '' ? undefined : value),
        }),
    });

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
