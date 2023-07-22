export interface TicketActivityApiResponse {
  records: TicketActivity[];
}
export type TicketActivityPostType = 'USER_POSTED';
export interface TicketActivity {
  _id: string;
  ticket: string;
  post: string;
  media: any[];
  postedBy: PostedBy;
  type: TicketActivityPostType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostedBy {
  _id: string;
  firstName: string;
  email: string;
  userAvatar: string;
}

export interface ActivityPostBody {
  post: string;
  media: string[];
}
