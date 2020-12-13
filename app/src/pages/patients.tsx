import { Component } from 'react';
import { message, Spin, Select, Descriptions, Form, Typography, Alert } from 'antd';
import { VaccinationService } from '../services/VaccinationService';
import { VaccineService } from '../services/VaccineService';
import { Vaccine, Patient } from '../models';

const { Title } = Typography;

interface PatientsByVaccineProps {}
interface PatientsByVaccineState {
  loading: boolean;
  patients: Patient[];
  vaccines: Vaccine[];
  selectedVaccine?: Vaccine;
}

export default class PatientsByVaccine extends Component<PatientsByVaccineProps, PatientsByVaccineState> {

  private vaccinationService: VaccinationService;
  private vaccineService: VaccineService;
  

  constructor(props: PatientsByVaccineProps) {
    super(props);
    this.vaccinationService = VaccinationService.getInstance();
    this.vaccineService = VaccineService.getInstance();
    
    this.state = {
      loading: true,
      patients: [],
      vaccines: [],
      selectedVaccine: undefined,
    };
  }

  componentDidMount() {
    this.vaccineService.listVaccines()
      .then((vaccines: Vaccine[]) => {
        this.setState({ ...this.state, vaccines: vaccines, loading: false });
      })
      .catch(error => {
        this.setState({ ...this.state, loading: false });
        message.error(error.message);
      });
  }

  onSelectVaccine = (vaccineId: number) => {
    this.setState({ ...this.state, loading: true });
    const selectedVaccine = this.state.vaccines.find(({ id }) => vaccineId == id);
    this.setState({ ...this.state, selectedVaccine });
    this.vaccinationService.getPatientsByVaccine(vaccineId)
      .then((patients: Patient[]) => {
        this.setState({ ...this.state, loading: false, patients });
      })
      .catch(error => {
        this.setState({ ...this.state, loading: false });
        message.error(error.message);
      });
  };

  render() {
    return (
        <>
            <Spin tip="Carregando..." spinning={this.state.loading}>
                <Form.Item label="Selecione uma vacina">
                    <Select style={{ width: 250 }} onChange={this.onSelectVaccine}>
                    {this.state.vaccines.map((vaccine: Vaccine) => (
                        <Select.Option
                            key={vaccine.id}
                            value={vaccine.id}
                        >
                        {`${vaccine.name} - ${vaccine.manufacturer}`}
                        </Select.Option>
                    ))}
                    </Select>
                </Form.Item>
                <Title level={4}>Informações dos vacinados</Title>
                {
                    !this.state.loading && (this.state.selectedVaccine != undefined) && (this.state.patients.length == 0) && 
                    (<Alert
                        message="Atenção"
                        description={`Não foi encontrado nenhum registro de paciente com a vacina ${this.state.selectedVaccine.name}`}
                        type="warning"
                        showIcon
                        closable
                        style={{marginTop: 20}}
                    />)
                }
                {!this.state.loading && this.state.patients.length > 0 && this.state.patients.map((patient: Patient) => (
                    <Descriptions key={patient.id}>
                        <Descriptions.Item label="ID">{patient.id}</Descriptions.Item>
                        <Descriptions.Item label="Nome">{patient.name}</Descriptions.Item>
                        <Descriptions.Item label="CPF">{patient.cpf}</Descriptions.Item>
                    </Descriptions>
                ))}
            </Spin>
        </>
    );
  }

}
