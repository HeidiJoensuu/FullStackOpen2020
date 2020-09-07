export interface diagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface patient {
  id: number;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSensitivePatientEntry = Omit<patient, 'ssn'>;

export type NewPatientEntry = Omit<patient, 'id'>;