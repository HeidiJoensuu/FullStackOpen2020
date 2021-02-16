import patiensData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import {Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  PublicPatient,
  Entry,
  NewEntry,
  HealthCheckRating
} from '../types';

const patiens: Array<Patient> = patiensData as Array<Patient>;

const getPatientEntries = (): Array<Patient> => {
  return patiens;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
    return patiens.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id, name, ssn, dateOfBirth, gender, occupation, entries
    }));
  };

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...entry
  };
  patiens.push(newPatient);
  return newPatient;
};

const getSinglePatient = (id: string): PublicPatient | undefined => {
  const patient = patiens.find(p => p.id === id);
  return patient;
};

const addPatientEntry = (entry: NewEntry, PatientID: string, healthRating?: HealthCheckRating): Entry | Error => {
  let newEntry;
  newEntry = {
    id: uuidv4(),
    ...entry
  }
  if (entry.type === "HealthCheck") {
    if (healthRating !== undefined) {
    newEntry = {...newEntry, healthCheckRating: healthRating}
    }
    else {
      return new Error("healthRating is missing");
    }
  }
  patiens.find(p => p.id === PatientID)?.entries.push(newEntry)
  return newEntry
}

export default {
  getPatientEntries,
  getNonSensitivePatientEntry,
  addPatient,
  getSinglePatient,
  addPatientEntry
};