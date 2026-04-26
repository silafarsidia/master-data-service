import 'dotenv/config';

import Fastify from 'fastify';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.middleware.js';

const app = Fastify({ logger:true });

app.register(routes);
app.setErrorHandler(ErrorHandler);


export default app;
