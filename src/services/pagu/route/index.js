import { getPaguHandler } from "../controller/pagu.controller.js";

async function routes (fastify, options) {
    fastify.get('/pagu', getPaguHandler);
}

export default routes;
