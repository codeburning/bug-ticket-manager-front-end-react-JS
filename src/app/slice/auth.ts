import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthLogin, LoginApiResponse, User } from '../types/auth';
import { loginApi } from '../api/auth/login';
import {
  deleteAllFromLocal,
  getItemFromLocal,
  setItemInLocal,
} from '../utils/local-storage';

interface AuthState {
  user?: User;
  loggedIn: true | false;
  loading: true | false;
}

const initialState: AuthState = {
  user: getItemFromLocal('user') || undefined,
  loggedIn: getItemFromLocal('logged-in') || false,
  loading: false,
};

export const loginAction = createAsyncThunk<LoginApiResponse, AuthLogin>(
  'login-action',
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginApi(body);
      return response;
    } catch (e) {
      //handle axios error
      return rejectWithValue('Error');
    }
  },
);
const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    logoutAction: (s) => {
      s.loggedIn = false;
      s.user = undefined;
      deleteAllFromLocal();
    },
  },
  extraReducers: (b) => {
    b.addCase(loginAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(loginAction.rejected, (s) => {
      s.loading = false;
      s.loggedIn = false;
    });
    b.addCase(loginAction.fulfilled, (s, { payload }) => {
      s.loggedIn = true;
      s.loading = false;
      s.user = payload.user;
      setItemInLocal('token', payload.token.session);
      setItemInLocal('refresh-token', payload.token.refresh);
      setItemInLocal('user', payload.user);
      setItemInLocal('logged-in', true);
    });
  },
});
export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
