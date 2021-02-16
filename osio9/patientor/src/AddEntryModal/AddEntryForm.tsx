import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, NumberField, DiagnosisSelection, TypeOption, SelectFieldTypes} from "../AddPatientModal/FormField";
import { Gender, Patient, Entry, Diagnosis, Types } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Types.HealthCheck, label: "HealthCheck" },
  { value: Types.Hospital, label: "Hospital" },
  { value: Types.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  let diagnoses: Diagnosis[];
  if (Object.values(diagnosis)) {
    // @ts-ignore
    diagnoses = Object.values(diagnosis);
  }

  return (
    <div>
      <div>
        <br />
        <Formik
          initialValues={{
            type: "OccupationalHealthcare",
            description: "",
            date: "",
            specialist: "",
            //healthCheckRating: undefined,
            diagnosisCodes: [],
            employerName: "",
            discharge: {
              date: "",
              criteria: ""
            },
            sickLeave: {
              startDate: "",
              endDate: ""
            }
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if(!values.type){
              errors.type = requiredError;
            }
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist){
              errors.specialist = requiredError;
            } 
            if (values.type === "HealthCheck" && !values.healthCheckRating && values.healthCheckRating !== 0) {
              errors.healthCheckRating = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <div>
                <Form className="form ui">
                  <SelectFieldTypes
                    label="Type"
                    name="type"
                    options={typeOptions}
                  />
                  <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                  />
                  <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                  />
                  <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                  />
                  <Field
                    label="healthCheckRating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                    required
                  />
                  {DiagnosisSelection({
                    diagnoses,
                    setFieldValue,
                    setFieldTouched
                  })}
                  <Field
                    label="Employer name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                  />
                  <Field
                    label="Discharge date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                  />
                  <Field
                    label="Discharge criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.startDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                  <Grid>
                    <Grid.Column floated="left" width={5}>
                      <Button type="button" onClick={onCancel} color="red">
                        Cancel
                      </Button>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                      <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                      >
                        Add
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
