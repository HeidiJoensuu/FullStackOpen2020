import express from 'express';
import diagnoseService  from '../src/services/diagnoseService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diagnoseService.getDiagnoseEntries());
});

export default router;