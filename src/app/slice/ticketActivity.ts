import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TicketActivity,
  TicketActivityApiResponse,
} from '../types/ticketActivity';
import { getTicketActivityApi } from '../api/tickets/activity/getActivity';
interface Props {
  loading: true | false;
  records: TicketActivity[];
}
const initialState: Props = {
  loading: false,
  records: [],
};
export const GetTicketActivityAction = createAsyncThunk<
  TicketActivityApiResponse,
  string
>('get-activities', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getTicketActivityApi(id);
    return response;
  } catch (e) {
    return rejectWithValue('Error');
  }
});
const ticketActivity = createSlice({
  name: 'ticket_activity',
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetTicketActivityAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(GetTicketActivityAction.rejected, (s) => {
      s.loading = false;
      s.records = [];
    });
    b.addCase(GetTicketActivityAction.fulfilled, (a, { payload }) => {
      a.records = payload.records;
      a.loading = false;
    });
  },
});

export default ticketActivity.reducer;
