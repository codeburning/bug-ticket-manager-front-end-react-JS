import axios from '../../axios';
import { AuthLogin, LoginApiResponse } from '../../types/auth';

export const loginApi = async (body: AuthLogin) => {
  try {
    const { data } = await axios.post<LoginApiResponse>('auth/login', body);
    return data;
  } catch (e) {
    throw e;
  }
};
