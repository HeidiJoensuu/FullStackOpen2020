import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis, Entry } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient | undefined };
  diagnosis: { [code: string]: Diagnosis | undefined };
};

const initialState: State = {
  patients: {},
  diagnosis: {},
};

export const settingPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi }
}

export const settingDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return { type: "GET_DIAGNOSES", payload: diagnosesFromApi}
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
export const setPatientList = (PatientListFromApi : Patient[]) => settingPatientList(PatientListFromApi);
export const setDiagnoses = (diagnosesFromApi: Diagnosis[]) => settingDiagnoses(diagnosesFromApi);