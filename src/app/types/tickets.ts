export interface GetTicketsApiResponse {
  records: Ticket[];
}

export interface Ticket {
  _id: string;
  ticketId: string;
  title: string;
  description: string;
  notes: string | undefined;
  assignedTeam: TicketAssignedTeam[];
  createdBy: TicketCreatedBy;
  status: string;
  closedAt: number;
  closedBy: string | undefined;
  media: string[];
  clientName: string;
  clientEmail: string;
  userName: string;
  userMobile: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TicketAssignedTeam {
  _id: string;
  name: string;
}

export interface TicketCreatedBy {
  _id: string;
  firstName: string;
  email: string;
  userAvatar: string;
}

export interface TicketCreationBody {
  title: string;
  description: string;
  assignedTeam: string[];
  media: string[]; //if passed should be a valid URL
  clientName: string;
  clientEmail: string;
  userName: string;
  userMobile: string;
}
