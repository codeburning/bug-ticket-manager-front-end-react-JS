export interface TeamApiResponse {
  records: Team[];
}

export interface Team {
  _id: string;
  name: string;
  manager: Manager;
  members: string[];
  createdBy: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  //   __v: number;
}

export interface Manager {
  _id: string;
  firstName: string;
  email: string;
  userAvatar: string;
}

export interface NewTeamBody {
  name: string;
  manager: string;
  members: string[];
}
