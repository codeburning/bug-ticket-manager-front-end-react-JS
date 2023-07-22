import axios from '../../axios';
import { Ticket } from '../../types/tickets';

export const getTicketDetailsApi = async (ticketId: string) => {
  try {
    //Details Api is missing
    //Lets build api end point to get Ticket details
    const { data } = await axios.get<Ticket>(`tickets/${ticketId}`);
    return data;
    // return;
  } catch (e) {
    throw e;
  }
};
