// import 'dotenv/config';

// import Fastify from 'fastify';
// import cors from '@fastify/cors';
// import routes from './satker/routes/index.js';
// import routespagu from './pagu/route/index.js';

// console.log('USING PORT:', process.env.PORT);

// const fastify = Fastify({
//     logger: true
// });

// await fastify.register(cors, {
//     origin: '*' // Atur sesuai kebutuhan, '*' untuk mengizinkan semua origin
// });

// // const port = process.env.PORT 
// // const host = process.env.HOST 
// const port = 3000;
// const host = 'localhost';

// fastify.register(routes, { prefix: '/api' });
// fastify.register(routespagu, { prefix: '/api' });

// const start = async () => {
//     try {
//         await fastify.listen({ port, host });
//         console.log(`Server running at http://${host}:${port}`);
//     } catch (err) {
//         fastify.log.error(err);
//         process.exit(1);
//     }
// };

// start();

// // Di akhir file src/services/satker.server.js
// module.exports = async (req, res) => {
//   await app.ready();
//   app.server.emit('request', req, res);
// };

import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './satker/routes/index.js';
import routespagu from './pagu/route/index.js';

const fastify = Fastify({
    logger: true
});

// Bungkus pendaftaran plugin dalam fungsi async (hindari top-level await yang bikin error di Vercel)
const buildApp = async () => {
    await fastify.register(cors, {
        origin: '*' 
    });

    fastify.register(routes, { prefix: '/api' });
    fastify.register(routespagu, { prefix: '/api' });

    await fastify.ready();
    return fastify;
};

// Logika untuk Local Development (npm run satker)
if (process.env.NODE_ENV !== 'production') {
    const port = 3000;
    const host = 'localhost';
    
    const start = async () => {
        try {
            const app = await buildApp();
            await app.listen({ port, host });
            console.log(`Server running at http://${host}:${port}`);
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    };
    start();
}

// EXPORT UNTUK VERCEL (Gunakan sintaks ES Modules karena package.json kamu "type": "module")
export default async (req, res) => {
    const app = await buildApp();
    app.server.emit('request', req, res);
};