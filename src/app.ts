import express from 'express';
import cors from 'cors';
import codeforcesRoutes from './routes/codeforces.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/codeforces', codeforcesRoutes);

export default app;
