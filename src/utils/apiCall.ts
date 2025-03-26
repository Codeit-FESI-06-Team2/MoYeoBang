import { publicAxiosInstance, authAxiosInstance } from '@/axios/axiosInstance';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';
import NodeCache from 'node-cache';

// 캐시 유효 시간: 60초
const apiCache = new NodeCache({ stdTTL: 60 });

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

    // 캐시 확인
    if (method === 'get') {
      const cacheKey = `${url}:${JSON.stringify(queryParams)}`;
      const cachedData = apiCache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }
    }

    const axiosInstance =
      method === 'get' ? publicAxiosInstance : authAxiosInstance;

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      params: queryParams,
      ...axiosConfig,
      paramsSerializer: (params: any) =>
        qs.stringify(params, {
          skipNulls: true,
          arrayFormat: 'brackets',
          filter: (prefix, value) => (value === '' ? undefined : value),
        }),
    };

    // Include data for non-GET methods
    if (method !== 'get') {
      requestConfig.data = data;
    }

    const response = await axiosInstance.request(requestConfig);

    // 캐시 저장
    if (method === 'get') {
      const cacheKey = `${url}:${JSON.stringify(queryParams)}`;
      apiCache.set(cacheKey, response.data);
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
