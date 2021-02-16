import React from "react";
import axios from "axios";
import './index.css'

import { Entry, Patient, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon, Button } from 'semantic-ui-react'
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const [{ diagnosis }] = useStateValue();
  const diagnoses = diagnosis;
  
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const icons = (patient: Patient) => {
    if (patient.gender === 'male') {
      return (
        <Icon name='mars' />
      )
    } else if (patient.gender === 'female') {
      return (
        <Icon name='venus' />
      )
    } else {
      return (
        <Icon name='genderless' />
      )
    }
  }

  const listDiagnoses = (code: Array<Diagnosis['code']> | undefined) => {
    return (
      <div>
        {code ?
        code.map(key => (
          <dd><li>{diagnoses[key]?.code}  {diagnoses[key]?.name}</li></dd>
        )) :
        <></>
        }
      </div>
    )
  }
  const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
     <div className="border">
        <h4>{entry?.date} <Icon name='hospital' size='big'/> </h4>
          <p>
            <i>{entry?.description}</i>
        </p>
        {listDiagnoses(entry?.diagnosisCodes)}
      </div>
    )
  }

  const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    const HealtColor = (entry: Entry) => {
      if (entry.type === 'HealthCheck') {
        switch (entry.healthCheckRating) {
          case 3:
            return 'red'
          case 2:
            return 'orange'
          case 1:
            return 'yellow'
          default:
            return 'green'
        }
      }
    }
    
    return (
     <div className="border">
        <h4>{entry?.date} <Icon name='stethoscope' size='big'/></h4>
        <p>
          <i>{entry?.description}</i>
        </p>
        <Icon name='heart' color={HealtColor(entry)}/>
      </div>
    )
  }

  const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
      <div className="border">
        <h4>{entry?.date}  <Icon name='user md' size='big'/> {entry?.employerName}</h4>
        <p>
          <i>{entry?.description}</i>
        </p>
        {listDiagnoses(entry?.diagnosisCodes)}
      </div>
    )
  }
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient?.id}/entries`,
        values
      );
      if (patient){
        dispatch({ type: "ADD_ENTRY", payload: { entry: newEntry, patientId: patient.id } });
      } else {
        console.log("vituiks man")
      }
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />
      case "OccupationalHealthcare":
          return <OccupationalHealthcareEntry entry={entry} />
      default:
        return <HospitalEntry entry={entry} />
    }
  }
  
  if (patient) {
    return (
      <div className="App">
        <h3>{patient.name} {icons(patient)}</h3>
        <p>ssn: {patient.ssn} <br /> occupation: {patient.occupation}</p>
        <h4>entries</h4>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        {patient.entries.map((entry: Entry | undefined) => (
          <>
            {entry ? <EntryDetails entry={entry} />: <></>}
          </>
        ))}
      </div>
    );
  }
  else {
    return (
      <div>
        <p>Nothing found</p>
      </div>
    )
  }
};

export default PatientInfoPage;
