import { HttpStatusCode } from 'axios';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.BadRequest);
  }
}
