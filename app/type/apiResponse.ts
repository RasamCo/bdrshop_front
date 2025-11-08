// ساختار عمومی پاسخ API
export interface ApiResponse<T> {
  // status: number;
  // success: boolean;
  // message: string;
  data: {
    result: T;
  };
  // meta: {
  //   timestamp: string;
  //   executionTimeMs: number;
  // };
}
