import { BlockchainService } from './blockchain';
import { VaccinationInstitute } from '../models';

export class VaccinationInstituteService extends BlockchainService {

    private static instance: VaccinationInstituteService;

    private constructor() {
        super();
    }

    public static getInstance(): VaccinationInstituteService {
        if (!VaccinationInstituteService.instance) {
            return new VaccinationInstituteService();
        }

        return VaccinationInstituteService.instance;
    }

    public async listVaccinationInstitutes(): Promise<VaccinationInstitute[]> {
        try {
            const institutes = await this.contract.methods.listInstitutes().call();
            return institutes.map(({ id, name }) => ({ id: parseInt(id, 10), name }));
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao listar institutos de vacinação disponíveis');
        }
    }

    public async getVaccinationInstituteById(id: number): Promise<VaccinationInstitute> {
        try {
            const institute = await this.contract.methods.getInstituteById(id).call();
            return {
                id: parseInt(institute.id, 10),
                name: institute.name,
            };
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao consultar dados do instituto de vacinação '${id}'`);
        }
    }
}

