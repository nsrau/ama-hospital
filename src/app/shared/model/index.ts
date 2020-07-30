export interface PatientsInterface {
  objectId: string;
  name: string;
  gender: string;
  birthDate: BirthDateInterface;
  heightCm: number;
  weightKg: number;
  bmi: number;
  show: boolean;
}

interface BirthDateInterface {
  iso: string;
}

export interface SummaryInterface {
  activity: ActivityInterface;
  minutes: number;
  patient: PatientsInterface;
}

interface ActivityInterface {
  activity: string;
  intensity: string;
  objectId: string;
}

export interface DefinitionsInterface {
  activity: string;
  intensity: string;
}
