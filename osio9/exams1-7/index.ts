import express from 'express';
import {parseQueryBmi} from './bmiCalculator';
import {parseQueryEx} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  try {
    const bmi = parseQueryBmi(String(request.query.height), String(request.query.weight));
    const result = {
      height: request.query.height,
      weight: request.query.weight,
      bmi: bmi
    };
    response.send(result);
  } catch (error) {
    if (error instanceof Error) {
    console.log(error.message);
    } else {
      throw error;
    }
  }
});

app.post('/exercise', (request, response) => {
  console.log(request.body);
  
  try {
    const exercise = parseQueryEx(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.body.daily_exercises as Array<number>,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.body.target as number
    );
    response.send(exercise);
  } catch (error) {
    if (error instanceof Error) {
    console.log(error.message);
    } else {
      throw error;
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});