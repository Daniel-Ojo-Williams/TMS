export class CustomError extends Error {
  constructor(public statusCode: number, message: string, public data?: unknown) {
    super(message);
  }
}