/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, NewEntry } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): NewEntry => {
  const newE: NewEntry = {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
    employerName: parseString(object.employerName),
    discharge: {date: parseSickLeaveDate(object.discharge?.date), criteria: parseString(object.discharge?.criteria)},
    sickLeave: {startDate: parseSickLeaveDate(object.sickLeave?.startDate), endDate: parseSickLeaveDate(object.sickLeave?.endDate)},
  }
  return newE;
}


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (dateOfBirth: string): boolean => {
  console.log(Boolean(Date.parse(dateOfBirth)));
  
  return Boolean(Date.parse(dateOfBirth));
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)){
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)){
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)){
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)){
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
}
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)){
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};
const parseSickLeaveDate = (date: any): string => {
  console.log(date);
  if (date !== undefined && date !== "") {
    if (!isString(date) || !isDate(date)){
      throw new Error(`Incorrect or missing date: ${date}`);
    }
  }
  return date;
};
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)){
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseString = (string: any): string => {
  if (!isString(string) && string !== undefined){
    throw new Error(`Incorrect employerName or criteria: ${string}`);
  }
  return string;
};

export default {
  toNewPatientEntry,
  toNewEntry
};