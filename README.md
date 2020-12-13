# Blockchain Vaccination

It's a prototype for a vaccination registration service, backed by a Blockchain technology (Ethereum - [Geth](https://hub.docker.com/r/ethereum/client-go/)) and [Next.js](https://nextjs.org/) for the application frontend.

The repository structure is divided in 3 main modules as shown below:
```
├── app
├── monitoring
└── nodes
```

- **nodes**: corresponds to Ethereum mining nodes running Geth
- **app**: corresponds to the frontend application made with Next.js
- **monitoring**: corresponds to the `node1` monitoring service

The Ethereum network uses three mining nodes, being one (node1) the responsible for providing de RPC/HTTP interface exposed to Web3 on port **8501**. The genesis file for the Ethereum network has been generated using `puppeth` with Proof of Authority (PoA) consensus engine.

Special thanks to [thomasxnguy](https://github.com/thomasxnguy/docker-ethereum) for providing a good example working with 2 nodes without a `bootnode`.
### Prerequisites

The following two components are mandatory

 - [Docker](https://docs.docker.com/get-docker)
 - [Docker Compose](https://docs.docker.com/compose/install)

# Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

First, clone the repository on a local directory and create a *.env* file following the instructions.

```shell script
$ git clone git@github.com:gleme/blockchain-vaccination.git .

$ cd blockchain-vaccination

$ cp ./app/sample.env ./app/.env
```

The last command on the above script, copies the `sample.env` file to a `.env` to be used by the local installation. The `.env`  contains two environment variables: 
 - **NEXT_PUBLIC_RPC_API_URL**: the url endpoint to the RPC exposed node, on our case *http://localhost:8501*
 - **NEXT_PUBLIC_CONTRACT_ADDRESS**: the smart contract`s address in the Blockchain, on our case *0x4F02E0Fa790698b47CD30AC73ee8BE89d09E942B*

Then, the containers should build and run with the following command:

```shell script
$ docker-compose up -d

```

After the Docker containers are built and running, you should get:

- The Vaccination Application at [`http://localhost`](http://localhost)
- The Ethereum Network Status for node1 at [`http://localhost:3000`](http://localhost:3000)
- The RCP Interface for node1 at [`http://localhost:8501`](http://localhost:8501)

#### Get Enode Id

To get the Enode Ids from the running node containers, run the following commands:
```
$ docker logs geth_node1 2>&1 | grep "enode:"
$ docker logs geth_node2 2>&1 | grep "enode:"
$ docker logs geth_node3 2>&1 | grep "enode:"
```


### Work Division
- Research Proposal: Andrei Carniel
- Article Writing: Andrei Carniel & Gustavo Leme
- Article Revision: Andrei Carniel & Gustavo Leme
- Ethereum Smart Contract: Andrei Carniel & Gustavo Leme
- Application Frontend: Gustavo Leme
- Containerized Ethereum Network: Gustavo Leme
