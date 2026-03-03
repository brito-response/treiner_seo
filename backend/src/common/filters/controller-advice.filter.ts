import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';
import { ApiError } from "../errors/api-error.class";

@Catch()
export class ControllerAdviceFilter implements ExceptionFilter {
    private readonly logger = new Logger(ControllerAdviceFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | object = 'Internal server error';

        if (exception instanceof ApiError) {
            status = exception.status;
            message = exception.message;
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse();
        }

        this.logger.error(`Erro acontecendo em ${request.method} ${request.url}`,JSON.stringify({ status, message }));

        response.status(status).send({ statusCode: status, timestamp: new Date().toISOString(), path: request.url, message });
    }

}