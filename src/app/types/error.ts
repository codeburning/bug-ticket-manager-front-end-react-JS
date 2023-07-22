// export Error
export interface ApiErrorResponse {
  error: boolean;
  message?: string;
  details?: Details;
}
export interface Details {
  type: string;
  msg: string;
  path: string;
  location: string;
}
