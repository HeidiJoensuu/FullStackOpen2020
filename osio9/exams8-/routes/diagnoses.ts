import express from 'express';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send('Fetching all diagnoses!');
});

export default router;