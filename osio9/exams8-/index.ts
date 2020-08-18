import express from 'express';
const app = express();
import diagnosesRouter from './routes/diagnoses';
app.use(express.json());
import cors from 'cors';

app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});