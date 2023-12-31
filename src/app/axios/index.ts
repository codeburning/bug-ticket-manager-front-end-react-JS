// export const axios = Axios

import Axios from 'axios';
import { getItemFromLocal } from '../utils/local-storage';

const BASE_URL = 'http://localhost:8081/v1/';
const axios = Axios.create({ baseURL: BASE_URL });

axios.interceptors.request.use(
  (config: any) => {
    const token = getItemFromLocal('token');
    if (token) {
      config.headers = { ...config.headers, Authorization: `BEARER ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// function deleteSession() {
//   const event = new Event('user-logout-action');
//   window.dispatchEvent(event);
// }

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      //   deleteSession();
    } else {
      console.log('Api level error');
    }
    return Promise.reject(err);
  },
);

export default axios;
