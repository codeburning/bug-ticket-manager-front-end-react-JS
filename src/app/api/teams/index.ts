import axios from '../../axios';
import { NewTeamBody, TeamApiResponse } from '../../types/teams';

export const getTeamsApi = async () => {
  try {
    const { data } = await axios.get<TeamApiResponse>(`teams/`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const createNewTeamApi = async (body: NewTeamBody) => {
  try {
    const { data } = await axios.post('teams/', body);
    return data;
  } catch (e) {
    throw e;
  }
};
