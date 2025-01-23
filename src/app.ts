import express from 'express';
import router from './routes/tracking.routes';

const app = express();

app.use(router);

export default app;
