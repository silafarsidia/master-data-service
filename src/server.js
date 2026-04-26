import server from './servers/index.js'

const host =
  process.env.NODE_ENV !== 'production'
    ? 'localhost'
    : '0.0.0.0';

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await server.listen({ port, host }); // ✅ wajib pakai object
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
