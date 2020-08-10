import express from 'express';
import {parseQuery} from './bmiCalculator';

const app = express();

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  try {
    const bmi = parseQuery(String(request.query.height), String(request.query.weight));
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});