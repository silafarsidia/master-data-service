import satker from '../services/satker/routes/index.js';

async function routes(fastify, options) {
    fastify.register(satker, { prefix: '/api' });
}

export default routes;
