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

    // 기본 baseURL이 있는지 확인하고, 없으면 빈 문자열 할당
    const baseURL =
      publicAxiosInstance.defaults.baseURL || 'https://54.180.79.214.nip.io/';

    // 현재 URL이 상대 경로인지 확인 후 절대 경로로 변환
    const finalUrl = url.startsWith('/') ? `${baseURL}${url}` : url;

    // TEST:쿼리 문자열 생성
    const queryString = qs.stringify(queryParams, {
      skipNulls: true,
      arrayFormat: 'brackets',
      filter: (prefix, value) => (value === '' ? undefined : value),
    });

    // TEST: 최종 URL
    const fullUrl = queryString ? `${finalUrl}?${queryString}` : finalUrl;
    console.log('Full URL:', fullUrl);

    const response = await axiosInstance[method](fullUrl, data, {
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
