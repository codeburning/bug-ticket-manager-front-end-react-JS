import axios from '../../axios';
import { GetTicketsApiResponse } from '../../types/tickets';

export const getTicketsApi = async () => {
  try {
    //Todo will add support for query param and pagination
    const { data } = await axios.get<GetTicketsApiResponse>(`tickets/`);
    return data;
  } catch (e) {
    throw e;
  }
};
