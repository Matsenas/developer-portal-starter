export interface ErrorRes {
  response: string;
  error: {
    status_code: number;
    code: string;
    message: string;
  };
}
