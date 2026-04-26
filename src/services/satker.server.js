import 'dotenv/config';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './satker/routes/index.js';
import routespagu from './pagu/route/index.js';

console.log('USING PORT:', process.env.PORT);

const fastify = Fastify({
    logger: true
});

await fastify.register(cors, {
    origin: '*' // Atur sesuai kebutuhan, '*' untuk mengizinkan semua origin
});

const port = process.env.PORT 
const host = process.env.HOST 

fastify.register(routes, { prefix: '/api' });
fastify.register(routespagu, { prefix: '/api' });

const start = async () => {
    try {
        await fastify.listen({ port, host });
        console.log(`Server running at http://${host}:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

module.exports = app;
