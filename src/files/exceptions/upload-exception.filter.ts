import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnprocessableEntityException,
  InternalServerErrorException,
  BadRequestException,
  PayloadTooLargeException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FilesService } from '@files/files.service';

type Exceptions =
  | UnprocessableEntityException
  | InternalServerErrorException
  | BadRequestException
  | PayloadTooLargeException;

@Catch(UnprocessableEntityException, InternalServerErrorException, BadRequestException, PayloadTooLargeException)
export class RemoveFileOnErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private filesService: FilesService) {}

  async catch(exception: Exceptions, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method, file } = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const message = exception['response']['message'];

    if (file) {
      await this.filesService.removeFile(file.path);
    }

    this.logger.error(
      `Route: {${url}, ${method}}, Status Code: [${statusCode}], Message: '${message}'`,
      exception.name,
    );

    response.status(statusCode).json(exception.getResponse());
  }
}
