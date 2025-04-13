

export type ReqSuccess<T> = {
  success: true;
  data: T;
};

export type ReqError = {
  success: false;
  error: {
    message: string;
    statusCode?: number;
  };
};