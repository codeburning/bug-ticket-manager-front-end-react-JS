import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Team, TeamApiResponse } from '../types/teams';
import { getTeamsApi } from '../api/teams';
interface TeamSliceProps {
  teams: Team[];
  loader: true | false;
}
/**
 * Get team action
 */
export const GetTeamAction = createAsyncThunk<TeamApiResponse, void>(
  'get-teams',
  async (_, { rejectWithValue }) => {
    try {
      const r = await getTeamsApi();
      return r;
    } catch (e: any) {
      return rejectWithValue('Error');
    }
  },
);
const initialState: TeamSliceProps = { teams: [], loader: false };
const teamSlice = createSlice({
  name: 'team-slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetTeamAction.rejected, (a) => {
      a.loader = false;
    });
    b.addCase(GetTeamAction.pending, (s) => {
      s.loader = true;
    });
    b.addCase(GetTeamAction.fulfilled, (s, { payload }) => {
      s.loader = false;
      s.teams = payload.records || [];
    });
  },
});

export default teamSlice.reducer;
