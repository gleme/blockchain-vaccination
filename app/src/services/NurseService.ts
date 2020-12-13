import { BlockchainService } from './blockchain';
import { Nurse } from '../models';

export class NurseService extends BlockchainService {

    private static instance: NurseService;

    private constructor() {
        super();
    }

    public static getInstance(): NurseService {
        if (!NurseService.instance) {
            return new NurseService();
        }

        return NurseService.instance;
    }

    public async listNurses(): Promise<Nurse[]> {
        try {
            const nurses = await this.contract.methods.listNurses().call();
            return nurses.map(({ id, name }) => ({ id: parseInt(id, 10), name }));
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao listar enfermeiras disponíveis');
        }
    }

    public async getNurseById(id: number): Promise<Nurse> {
        try {
            const nurse = await this.contract.methods.getNurseById(id).call();
            return {
                id: parseInt(nurse.id, 10),
                name: nurse.name,
            };
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao consultar dados da enfermeira '${id}'`);
        }
    }
}

