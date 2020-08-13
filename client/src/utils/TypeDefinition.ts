export enum ResponseStatus {
  SUCCESS,
  FAILED,
}

export type ResponseError = {
  trace?: any;
  message: string;
};

export type Response = {
  status: ResponseStatus;
  data?: any;
  error?: ResponseError;
};
