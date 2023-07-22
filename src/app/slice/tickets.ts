import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../types/tickets';
import { getTicketsApi } from '../api/tickets/getTickets';
import { getTicketDetailsApi } from '../api/tickets/getTicketDetails';
export interface TicketState {
  records?: Ticket[];
  loading: true | false;
  details?: Ticket;
}
const initialState: TicketState = {
  loading: false,
  records: [],
};
export const GetTicketsAction = createAsyncThunk<Ticket[], void>(
  'get-tickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTicketsApi();
      return response.records || [];
    } catch (e) {
      // throw new E
      return rejectWithValue('Error');
    }
  },
);
export const GetTicketDetailsAction = createAsyncThunk<Ticket, string>(
  'get-ticket-details',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTicketDetailsApi(id);
      return response;
    } catch (e) {
      return rejectWithValue('Error');
    }
  },
);
const ticketSlice = createSlice({
  name: 'tickets-slice',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(GetTicketsAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(GetTicketsAction.rejected, (s) => {
      s.loading = false;
      s.records = [];
    });
    b.addCase(GetTicketsAction.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.records = payload;
    });
    // ----------------
    b.addCase(GetTicketDetailsAction.pending, (s) => {
      s.loading = true;
    });
    b.addCase(GetTicketDetailsAction.rejected, (s) => {
      s.loading = false;
      s.details = undefined;
    });
    b.addCase(GetTicketDetailsAction.fulfilled, (a, { payload }) => {
      a.details = payload;
      a.loading = false;
    });
  },
});

export default ticketSlice.reducer;
