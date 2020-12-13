pragma solidity ^0.4.2;
pragma experimental ABIEncoderV2;

contract VaccineContract {
    
    // Models
    struct Institute {
        uint id;
        string name;    
    }

    struct Nurse {
        uint id;
        string name;    
    }

    struct Vaccine {
        uint id;
        string name;
        string manufacturer;
        uint batchNumber;
        uint expiresAt;
    }

    struct Vaccination {
        uint patientId;
        uint instituteId;
        uint nurseId;
        uint vaccineId;
        string location;
        uint createdAt;
    }

    uint private institutesCount;
    uint private nursesCount;
    uint private vaccinesCount;
    uint private vaccinationsCount;
    mapping(uint => Institute) public institutes;
    mapping(uint => Nurse) public nurses;
    mapping(uint => Vaccine) public vaccines;
    mapping(uint => Vaccination) public vaccinations;
    
    constructor() public {
        addIntitute("IPVacin - Instituto Paulista de Vacinação");
        addIntitute("Instituto Pasteur");
        addNurse("Maria da Silva");
        addNurse("Roberto Leal");
        addVaccine("AZD1222", "Pfizer", 100, 1640919600000);
        addVaccine("CoronaVac", "Fiocruz", 20, 1640919600000);
        addVaccine("mRNA 1273", "Sartorius", 15, 1640919600000);
        addVaccine("CoronaVac", "Instituto Butantan", 40, 1640919600000);
    }
    
    function addIntitute(string _name) private {
        institutes[institutesCount++] = Institute(institutesCount, _name);
    }

    function getInstitutesCount() view public returns(uint) {
        return institutesCount;
    }

    function getInstitute(uint index) public view returns(Institute memory) {
        return(institutes[index]);
    }

    function getInstituteById(uint id) public view returns(Institute memory) {
        for (uint i = 0; i < institutesCount; i++) {
            if (institutes[i].id == id) {
                return institutes[i];
            }
        }
    }

    function listInstitutes() public view returns(Institute[] memory allInstitutes) {

        allInstitutes = new Institute[](institutesCount);
        
        for (uint i = 0; i < institutesCount; i++) {
            allInstitutes[i] = institutes[i];
        }
    }
    
    function addNurse(string _name) private {
        nurses[nursesCount++] = Nurse(nursesCount, _name);
    }

    function getNursesCount() view public returns(uint) {
        return nursesCount;
    }

    function getNurse(uint index) public view returns(Nurse memory) {
        return(nurses[index]);
    }

    function listNurses() public view returns(Nurse[] memory allNurses) {

        allNurses = new Nurse[](nursesCount);
        
        for (uint i = 0; i < nursesCount; i++) {
            allNurses[i] = nurses[i];
        }
    }

    function getNurseById(uint id) public view returns(Nurse memory) {
        for (uint i = 0; i < nursesCount; i++) {
            if (nurses[i].id == id) {
                return nurses[i];
            }
        }
    }
    
    function addVaccine(string _name, string _manufacturer, uint _batchNumber, uint _expiresAt) private {
        vaccines[vaccinesCount++] = Vaccine(vaccinesCount, _name, _manufacturer, _batchNumber, _expiresAt);
    }

    function getVaccinesCount() view public returns(uint) {
        return vaccinesCount;
    }

    function getVaccine(uint index) public view returns(Vaccine memory) {
        return vaccines[index];
    }

    function getVaccineById(uint id) public view returns(Vaccine memory) {
        for (uint i = 0; i < vaccinesCount; i++) {
            if (vaccines[i].id == id) {
                return vaccines[i];
            }
        }
    }

    function listVaccines() public view returns(Vaccine[] memory allVaccines) {

        allVaccines = new Vaccine[](vaccinesCount);
        
        for (uint i = 0; i < vaccinesCount; i++) {
            allVaccines[i] = vaccines[i];
        }
    }
    
    function addVaccination(uint patientId, uint instituteId, uint nurseId, uint vaccineId, string location, uint createdAt) public {
        
        // require a valid patient_id
        require(patientId > 0);
        
        // require a valid institute
        require(instituteId >= 0 && instituteId <= institutesCount);
         
        // require a valid nurse
        require(nurseId >= 0 && nurseId <= nursesCount);
        
        // require a valid vaccine
        require(vaccineId >= 0 && vaccineId <= vaccinesCount);
        
        vaccinations[vaccinationsCount++] = Vaccination(patientId, instituteId, nurseId, vaccineId, location, createdAt);
    }

    function getVaccinationsCount() view public returns(uint) {
        return  vaccinationsCount;
    }

    function getVaccination(uint index) public view returns(Vaccination memory) {
        return vaccinations[index];
    }

    function getPatientVaccinations(uint patientId) public view returns(Vaccination[] memory patientVaccinations) {
        Vaccination[] memory vaccinationsTemp = new Vaccination[](vaccinationsCount);
        uint count;
        for (uint i = 0; i < vaccinationsCount; i++) {
            if (vaccinations[i].patientId == patientId) {
                vaccinationsTemp[count++] = vaccinations[i];
            }
        }

        patientVaccinations = new Vaccination[](count);
        for (i = 0; i < count; i++) {
            patientVaccinations[i] = vaccinationsTemp[i];
        }

    }

    function getPatientsByVaccine(uint vaccineId) public view returns(uint[] memory filteredPatients) {
        
        uint maxSize;
        for (uint i = 0; i < vaccinationsCount; i++) {
            if (vaccinations[i].vaccineId == vaccineId) {
                maxSize++;
            }
        }

        uint[] memory vaccinesIdsTemp = new uint[](maxSize);
        uint count;

        for (i = 0; i < vaccinationsCount; i++) {
            if (vaccinations[i].vaccineId == vaccineId) {
                vaccinesIdsTemp[count++] = vaccinations[i].patientId;
            }
        }

        filteredPatients = new uint[](count);
        for (i = 0; i < count; i++) {
            filteredPatients[i] = vaccinesIdsTemp[i];
        }
    }

} 