import express from 'express';
import patiensService from '../src/services/patiensService';
//import diagnoseService from '../src/services/diagnoseService';
import toNewPatientEntry from '../src/utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patiensService.getNonSensitivePatientEntry());
});

router.post('/', (request, response) => {
  try {
    const newPatient = toNewPatientEntry(request.body);
    const addedPatient = patiensService.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    response.status(400).send(error.message);
  }
});

export default router;