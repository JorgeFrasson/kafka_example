class AppError {
  title?: string | undefined;
  message: string;
  statusCode?: number;

  constructor({ message, statusCode = 400, title = undefined }: AppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.title = title;
  }
}

export default AppError;
