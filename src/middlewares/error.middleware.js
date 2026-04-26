import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

const errorHandler = (error, request, reply) => {
    if (error instanceof ClientError) {
        return reply.code(error.statusCode).send(response(error.statusCode, error.message, null));
    }

    const status = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';

    request.log.error(error); // logger Fastify

    return reply
        .code(status)
        .send(response(status, message, null));
};

export default errorHandler;
