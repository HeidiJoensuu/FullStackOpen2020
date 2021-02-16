import express from 'express';
import patiensService from '../src/services/patiensService';
//import diagnoseService from '../src/services/diagnoseService';
import parseEntry from '../src/utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patiensService.getNonSensitivePatientEntry());
});

router.post('/', (request, response) => {
  try {
    const newPatient = parseEntry.toNewPatientEntry(request.body);
    const addedPatient = patiensService.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.get('/:id', (request, response) => {
  try {
    const patient = patiensService.getSinglePatient(request.params.id);
    if (patient) {
      response.send(patient);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.post('/:id/entries', (request, response) => {
  try {
    const newEntry = patiensService.addPatientEntry(parseEntry.toNewEntry(request.body), request.params.id, request.body.healthCheckRating)
    response.json(newEntry)
  } catch (error) {
    response.status(400).send(error.message);
  }
})

export default router;