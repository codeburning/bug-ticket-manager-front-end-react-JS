// import axios from 'axios';
import axios from '../../../axios';
import { TicketActivityApiResponse } from '../../../types/ticketActivity';

export const getTicketActivityApi = async (id: string) => {
  try {
    const { data } = await axios.get<TicketActivityApiResponse>(
      `tickets/${id}/activity`,
    );
    return data;
  } catch (e) {
    throw e;
  }
};
