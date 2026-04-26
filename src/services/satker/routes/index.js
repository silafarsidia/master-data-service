import { createSatkerHandler, getSatkerHandler, getSatkerByIdHandler, editSatkerByIdHandler, deleteSatkerByIdhandler } from '../controllers/satker.controller.js';

async function routes(fastify, options) {
    fastify.post('/satker', createSatkerHandler);
    fastify.get('/satker', getSatkerHandler);
    fastify.get('/satker/:id', getSatkerByIdHandler);
    fastify.patch('/satker/:id', editSatkerByIdHandler);
    fastify.delete('/satker/:id', deleteSatkerByIdhandler);
}

export default routes;
