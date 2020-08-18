import diagnoseData from '../../data/diagnoses.json';
import {diagnoseEntry} from '../../types';

const diagnoses: Array<diagnoseEntry> = diagnoseData as Array<diagnoseEntry>;

const getEntries = (): Array<diagnoseEntry> => {
  return diagnoses;
};

export default {
  getEntries
};