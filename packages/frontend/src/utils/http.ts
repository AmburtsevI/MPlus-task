import axios, {
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios';

interface RefreshTokenResponse {
  accessToken: string;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5115/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (httpConfig: InternalAxiosRequestConfig) => {
    if (!localStorage.getItem('token')) {
      throw new Error('No token');
    }

    httpConfig.headers = {
      ...httpConfig.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    } as AxiosRequestHeaders;

    return httpConfig;
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse | Promise<never>> => {
    const request: AxiosRequestConfig & { _retry?: boolean } = error.config!;
    const status = error.response?.status;

    if (status === 401 && request && !request._retry) {
      request._retry = true;

      try {
        const { data } = await axiosInstance.post<RefreshTokenResponse>(
          '/auth/refresh',
          {},
          { withCredentials: true },
        );
        localStorage.setItem('token', data.accessToken);

        return axiosInstance.request(request);
      } catch (err) {
        console.error('Unauthorized');
      }
    }

    return Promise.reject(error);
  },
);
