import patiensData from '../../data/patients.json';
import {patient, NonSensitivePatientEntry, NewPatientEntry} from '../../types';

const patiens: Array<patient> = patiensData as Array<patient>;

const getPatientEntries = (): Array<patient> => {
  return patiens;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
    return patiens.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation
    }));
  };

const addPatient = (entry: NewPatientEntry): patient => {
  const newPatient = {
    id: Math.max(...patiens.map(d => d.id)) + 1,
    ...entry
  };
  patiens.push(newPatient);
  return newPatient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntry,
  addPatient
};