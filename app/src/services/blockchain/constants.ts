export const WEB3_HTTP_PROVIDER_URL = process.env.NEXT_PUBLIC_RPC_API_URL;
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "patientId",
				"type": "uint256"
			},
			{
				"name": "instituteId",
				"type": "uint256"
			},
			{
				"name": "nurseId",
				"type": "uint256"
			},
			{
				"name": "vaccineId",
				"type": "uint256"
			},
			{
				"name": "location",
				"type": "string"
			},
			{
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"name": "addVaccination",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getInstitute",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getInstituteById",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstitutesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getNurse",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getNurseById",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNursesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "vaccineId",
				"type": "uint256"
			}
		],
		"name": "getPatientsByVaccine",
		"outputs": [
			{
				"name": "filteredPatients",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "patientId",
				"type": "uint256"
			}
		],
		"name": "getPatientVaccinations",
		"outputs": [
			{
				"components": [
					{
						"name": "patientId",
						"type": "uint256"
					},
					{
						"name": "instituteId",
						"type": "uint256"
					},
					{
						"name": "nurseId",
						"type": "uint256"
					},
					{
						"name": "vaccineId",
						"type": "uint256"
					},
					{
						"name": "location",
						"type": "string"
					},
					{
						"name": "createdAt",
						"type": "uint256"
					}
				],
				"name": "patientVaccinations",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getVaccination",
		"outputs": [
			{
				"components": [
					{
						"name": "patientId",
						"type": "uint256"
					},
					{
						"name": "instituteId",
						"type": "uint256"
					},
					{
						"name": "nurseId",
						"type": "uint256"
					},
					{
						"name": "vaccineId",
						"type": "uint256"
					},
					{
						"name": "location",
						"type": "string"
					},
					{
						"name": "createdAt",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVaccinationsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getVaccine",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "manufacturer",
						"type": "string"
					},
					{
						"name": "batchNumber",
						"type": "uint256"
					},
					{
						"name": "expiresAt",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getVaccineById",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "manufacturer",
						"type": "string"
					},
					{
						"name": "batchNumber",
						"type": "uint256"
					},
					{
						"name": "expiresAt",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVaccinesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "institutes",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listInstitutes",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "allInstitutes",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listNurses",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					}
				],
				"name": "allNurses",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listVaccines",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "uint256"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "manufacturer",
						"type": "string"
					},
					{
						"name": "batchNumber",
						"type": "uint256"
					},
					{
						"name": "expiresAt",
						"type": "uint256"
					}
				],
				"name": "allVaccines",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nurses",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vaccinations",
		"outputs": [
			{
				"name": "patientId",
				"type": "uint256"
			},
			{
				"name": "instituteId",
				"type": "uint256"
			},
			{
				"name": "nurseId",
				"type": "uint256"
			},
			{
				"name": "vaccineId",
				"type": "uint256"
			},
			{
				"name": "location",
				"type": "string"
			},
			{
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vaccines",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "manufacturer",
				"type": "string"
			},
			{
				"name": "batchNumber",
				"type": "uint256"
			},
			{
				"name": "expiresAt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
