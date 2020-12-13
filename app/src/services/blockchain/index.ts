import Web3 from 'web3';
import { WEB3_HTTP_PROVIDER_URL, CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

let web3: typeof Web3 | null = null;

export function getProviderHttpProvider(): typeof Web3 {
	
	if (!web3) {
		web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP_PROVIDER_URL));
	}

	return web3;
}

type Contract = any;

export class ContractProvider {

    protected connection: typeof Web3;
    protected contract: Contract;
    private static instance: ContractProvider;

    private constructor(connection: typeof Web3, contractAbi: any[], contractAddr: string) {
        this.connection = connection;
        this.contract = new this.connection.eth.Contract(
            contractAbi,
            contractAddr,
        );
    }

    public static getInstance(): ContractProvider {
        if (!ContractProvider.instance) {
            ContractProvider.instance = new ContractProvider(getProviderHttpProvider(), CONTRACT_ABI, CONTRACT_ADDRESS);
        }

        return ContractProvider.instance;
    }

    public static getContract(): Contract {
        return ContractProvider.instance.contract;
    }

    public static getConnection(): typeof Web3 {
        return ContractProvider.instance.connection;
    }

}


export abstract class BlockchainService {

    private provider: ContractProvider;
    protected connection: typeof Web3;
    protected contract: Contract;

    constructor() {
        this.provider = ContractProvider.getInstance();
        this.contract = ContractProvider.getContract();
        this.connection = ContractProvider.getConnection();
    }

}

export * from './constants';