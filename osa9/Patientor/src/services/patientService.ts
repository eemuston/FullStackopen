import patientEntries from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };