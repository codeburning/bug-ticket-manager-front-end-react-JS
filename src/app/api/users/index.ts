import axios from '../../axios';
import { CreateUserBody } from '../../types/auth';
import { GetUserApiResponse } from '../../types/user';

export const getUsersApi = async () => {
  try {
    //Pagination will make dynamic
    const { data } = await axios.get<GetUserApiResponse>(
      `users/?page=1&size=10`,
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const createNewUserApi = async (b: CreateUserBody) => {
  try {
    const { data } = await axios.post(`users/`, b);
    return data;
  } catch (e) {
    throw e;
  }
};
