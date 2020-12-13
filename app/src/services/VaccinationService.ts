import { uniq, sortBy } from 'lodash';
import { BlockchainService } from './blockchain';
import { Vaccination, Patient } from '../models';
import { PatientService } from './PatientService';
import { VaccineService } from './VaccineService';
import { NurseService } from './NurseService';
import { VaccinationInstituteService } from './VaccinationInstituteService';

export class VaccinationService extends BlockchainService {

    private patientService: PatientService;
    private vaccineService: VaccineService;
    private nurseService:  NurseService;
    private instituteService: VaccinationInstituteService;

    private constructor(
        patientService: PatientService,
        vaccineService: VaccineService,
        nurseService: NurseService,
        instituteService: VaccinationInstituteService
    ) {
        super();
        this.patientService = patientService;
        this.vaccineService = vaccineService;
        this.nurseService = nurseService;
        this.instituteService = instituteService;
    }

    public static getInstance(): VaccinationService {
        return new VaccinationService(
            PatientService.getInstance(),
            VaccineService.getInstance(),
            NurseService.getInstance(),
            VaccinationInstituteService.getInstance(),
        );
    }

    public async register(vaccination: Vaccination) {
        try {
            const accounts = await this.connection.eth.getAccounts();
            return this.contract.methods.addVaccination(
                vaccination.patient.id,
                vaccination.institute.id,
                vaccination.nurse.id,
                vaccination.vaccine.id,
                vaccination.location,
                vaccination.injectedAt.getTime(),
            ).send({ from: accounts[0] });
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao registrar a vacinação do paciente '${vaccination.patient.name}'`);
        }
    }

    public async getPatientVaccinations(patientId: number): Promise<Vaccination[]> {
        try {
            const vaccinations = await this.contract.methods.getPatientVaccinations(patientId).call();
            const patient = this.patientService.getPatientById(patientId);
            const patientVaccinations: Vaccination[] = [];
            for (let vaccination of vaccinations) {
                const vaccine = await this.vaccineService.getVaccineById(parseInt(vaccination.vaccineId, 10));
                const nurse = await this.nurseService.getNurseById(parseInt(vaccination.nurseId, 10));
                const institute = await this.instituteService.getVaccinationInstituteById(parseInt(vaccination.instituteId, 10));
                const injectedAt = new Date(parseInt(vaccination.createdAt, 10));
                const location = String(vaccination.location);
                patientVaccinations.push({
                    patient,
                    vaccine,
                    nurse,
                    institute,
                    injectedAt,
                    location,
                }); 
            }

            return patientVaccinations;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao consultar registro de vacinações do paciente '${patientId}'`);
        }
    }

    public async getPatientsByVaccine(vaccineId: number): Promise<Patient[]> {
        try {
            const patientsIds = await this.contract.methods.getPatientsByVaccine(vaccineId).call();
            return sortBy(uniq(patientsIds).map((id: string) => this.patientService.getPatientById(parseInt(id, 10))), ['id', 'name']) as Patient[];
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao listar pacientes imunizados pela vacina de idenficador '${vaccineId}'`);
        }
    }

}

