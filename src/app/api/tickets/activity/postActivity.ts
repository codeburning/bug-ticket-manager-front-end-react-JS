import axios from '../../../axios';
import { ActivityPostBody } from '../../../types/ticketActivity';

export const postNewTicketActivity = async (
  id: string,
  body: ActivityPostBody,
) => {
  try {
    const { data } = await axios.post(`tickets/${id}/activity`, body);
    return data;
  } catch (e) {
    throw e;
  }
};
