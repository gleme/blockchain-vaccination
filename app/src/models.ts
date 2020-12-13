
export interface Vaccine {
    id: number;
    name: string;
    manufacturer: string;
    batchNumber: number;
    expiresAt: Date;
}

export interface Patient {
    id: number;
    name: string;
    cpf: string;
}

export interface Nurse {
    id: number;
    name: string;
}

export interface VaccinationInstitute {
    id: number;
    name: string;
}

export interface Vaccination {
    patient: Patient;
    vaccine: Vaccine;
    nurse: Nurse;
    institute: VaccinationInstitute;
    injectedAt: Date;
    location: string;
}