import { HttpStatusCode } from 'axios';
import { CustomError } from './custom-error';

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.Conflict);
  }
}
