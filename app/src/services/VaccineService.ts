import { BlockchainService } from './blockchain';
import { Vaccine } from '../models';

export class VaccineService extends BlockchainService {

    private static instance: VaccineService;

    private constructor() {
        super();
    }

    public static getInstance(): VaccineService {
        if (!VaccineService.instance) {
            return new VaccineService();
        }

        return VaccineService.instance;
    }

    public async listVaccines(): Promise<Vaccine[]> {
        try {
            const vaccines = await this.contract.methods.listVaccines().call();
            return vaccines.map(vaccine => ({
                id: parseInt(vaccine.id, 10),
                name: vaccine.name,
                manufacturer: vaccine.manufacturer,
                batchNumber: parseInt(vaccine.batchNumber, 10),
                expiresAt: new Date(parseInt(vaccine.expiresAt, 10)),
            }));
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao listar vacinas disponíveis');
        }
    }

    public async getVaccineById(id: number): Promise<Vaccine> {
        try {
            const vaccine = await this.contract.methods.getVaccineById(id).call();
            return {
                id: parseInt(vaccine.id, 10),
                name: vaccine.name,
                manufacturer: vaccine.manufacturer,
                batchNumber: parseInt(vaccine.batchNumber, 10),
                expiresAt: new Date(parseInt(vaccine.expiresAt, 10)),
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao consultar dados da vaccina');
        }
    }
}

