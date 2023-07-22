export interface AuthLogin {
  email: string;
  password: string;
}
export interface LoginApiResponse {
  token: Token;
  user: User;
}

export interface Token {
  session: string;
  refresh: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: any;
  isEmailVerified: boolean;
  mobile: any;
  profileImage: any;
  userAvatar: string;
  role: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
