import { Component } from 'react';
import { Alert, message, Spin, Select, Card, Descriptions, Typography, List, Form } from 'antd';
import moment from 'moment';
import { VaccinationService } from '../services/VaccinationService';
import { PatientService } from '../services/PatientService';
import { Vaccination, Patient } from '../models';

const { Title } = Typography;

interface VaccinesByPatientsProps {}
interface VaccinesByPatientsState {
  loading: boolean;
  selectedPatient: Patient;
  vaccinationsInfo: Vaccination[];

}

export default class VaccinesByPatients extends Component<VaccinesByPatientsProps, VaccinesByPatientsState> {

  private vaccinationService: VaccinationService;
  private patientService: PatientService;
  private defaultPatient: Patient;

  constructor(props: VaccinesByPatientsProps) {
    super(props);
    this.patientService = PatientService.getInstance();
    this.vaccinationService = VaccinationService.getInstance();
    const patients = this.patientService.getPatients();
    this.defaultPatient = patients[0];
    this.state = {
      loading: true,
      selectedPatient: this.defaultPatient,
      vaccinationsInfo: [],
    };
  }

  componentDidMount() {
    this.vaccinationService.getPatientVaccinations(this.defaultPatient.id)
      .then((vaccinations: Vaccination[]) => {
        this.setState({ ...this.state, vaccinationsInfo: vaccinations, loading: false });
      })
      .catch(error => {
        this.setState({ ...this.state, loading: false });
        message.error(error.message);
      });
  }

  onSelectPatient = (patientId: number) => {   
    this.setState({ ...this.state, loading: true }); 
    this.vaccinationService.getPatientVaccinations(patientId)
      .then((vaccinations: Vaccination[]) => {
        const patient = this.patientService.getPatientById(patientId);
        this.setState({ ...this.state, selectedPatient: patient, vaccinationsInfo: vaccinations, loading: false });
      })
      .catch(error => {
        this.setState({ ...this.state, loading: false });
        message.error(error.message);
      });
  };


  render() {
    return (
      <>
        <Form.Item label="Selecione um paciente:">
          <Select defaultValue={this.defaultPatient.id} style={{ width: 200, marginBottom: 20 }} onChange={this.onSelectPatient}>
            {this.patientService.getPatients().map(patient =>  (
              <Select.Option key={patient.id} value={patient.id}>
                { patient.name }
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Spin tip="Carregando..." spinning={this.state.loading}>  
          <Title level={4} >{`Vacinações do paciente ${this.state.selectedPatient.name}`}</Title>
          <Descriptions title="Infomações do Paciente" bordered size="small">
            <Descriptions.Item label="ID">{this.state.selectedPatient.id}</Descriptions.Item>
            <Descriptions.Item label="CPF">{this.state.selectedPatient.cpf}</Descriptions.Item>
            <Descriptions.Item label="Nome">{this.state.selectedPatient.name}</Descriptions.Item>
          </Descriptions>
          <List>
            {
              !this.state.loading && (this.state.vaccinationsInfo.length == 0) && 
              (<Alert
                message="Atenção"
                description="Não foi encontrado nenhum registro de vacinção para o paciente."
                type="warning"
                showIcon
                closable
                style={{marginTop: 20}}
              />)
            }
            {!this.state.loading && this.state.vaccinationsInfo.length > 0 && this.state.vaccinationsInfo.map((vaccination: Vaccination, index: number) => (
              <List.Item key={index}>
                <Card title={`Vacinação ${index + 1}`}>
                  <Descriptions title="Informações da Vacina" bordered size="small" style={{marginTop: 16 }}>
                    <Descriptions.Item label="ID">{vaccination.vaccine.id}</Descriptions.Item>
                    <Descriptions.Item label="Nome (tipo)">{vaccination.vaccine.name}</Descriptions.Item>
                    <Descriptions.Item label="Fabricante">{vaccination.vaccine.manufacturer}</Descriptions.Item>
                    <Descriptions.Item label="Lote">{vaccination.vaccine.batchNumber}</Descriptions.Item>
                    <Descriptions.Item label="Data de Validade">{moment(vaccination.vaccine.expiresAt).format('DD-MMM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Data da Aplicação da Vacina">{moment(vaccination.injectedAt).format('DD-MMM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Local da aplicação">{vaccination.location}</Descriptions.Item>
                  </Descriptions>
                  <Descriptions title="Informações do Insitituto de Vacinação" size="small" bordered style={{marginTop: 16 }}>
                    <Descriptions.Item label="ID">{vaccination.institute.id}</Descriptions.Item>
                    <Descriptions.Item label="Nome">{vaccination.institute.name}</Descriptions.Item>
                    <Descriptions.Item label="Enfermeiro(a)">{vaccination.nurse.name}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </List.Item>
            ))}
          </List>
          
        </Spin>
      </>
    );
  }

}
