import { Patient } from '../models';
import { sortBy, find } from 'lodash';

const patients: Patient[] = [
    {
        id: 1,
        name: 'Gustavo Leme',
        cpf: '324.533.980-16',
    },
    {
        id: 2,
        name: 'Andrei Carniel',
        cpf: '632.594.460-79',
    },
    {
        id: 3,
        name: 'Juliana de Melo Bezerra',
        cpf: '453.337.680-05',
    },
    {
        id: 4,
        name: 'Celso Hirata',
        cpf: '795.087.020-60',
    },
    {
        id: 5,
        name: 'Julio César Leitão',
        cpf: '025.663.260-02',
    },
];

export class PatientService {
    
    private static instance: PatientService;

    private constructor() { }

    public static getInstance(): PatientService {
        if (!PatientService.instance) {
            return new PatientService();
        }

        return PatientService.instance;
    }

    public getPatients(): Patient[] {
        return sortBy(patients, ['name', 'id']) as Patient[];
    }

    public getPatientById(patientId: number): Patient {
        const patient = find(patients, { id: patientId });
        if (!patient) {
            throw new Error(`Não foi possível encontrar um paciente com identificador ${patientId}`);
        }
        return patient;
    }

}