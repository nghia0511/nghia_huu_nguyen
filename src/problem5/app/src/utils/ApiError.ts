class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    console.log("🚀 ~ ApiError ~ constructor ~ statusCode:", statusCode)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
