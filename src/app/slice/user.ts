import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUserApiResponse } from '../types/user';
import { getUsersApi } from '../api/users';
import { User } from '../types/auth';
interface Props {
  users: User[];
  loader: boolean;
}
const initialState: Props = { users: [], loader: false };
export const GetUsersAction = createAsyncThunk<GetUserApiResponse, void>(
  'user-get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersApi();
      return response;
    } catch (e) {
      return rejectWithValue('Api Error');
    }
  },
);
const userSlice = createSlice({
  name: 'user-slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetUsersAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetUsersAction.rejected, (s) => {
      s.loader = false;
      s.users = [];
    });
    b.addCase(GetUsersAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.users = payload;
    });
  },
});
export default userSlice.reducer;
