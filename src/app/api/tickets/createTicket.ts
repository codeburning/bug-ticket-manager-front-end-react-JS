import axios from '../../axios';
import { TicketCreationBody } from '../../types/tickets';

export const createNewTicketApi = async (b: TicketCreationBody) => {
  try {
    const { data } = await axios.post(`tickets/`, b);
    return data;
  } catch (e) {
    throw e;
  }
};
