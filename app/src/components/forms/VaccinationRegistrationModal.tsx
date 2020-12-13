import React, { Component } from 'react';
import { Divider, Form, Input, Modal, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import async from 'async';

import { Vaccine, VaccinationInstitute, Patient, Nurse } from '../../models';
import { VaccinationInstituteService, NurseService, PatientService, VaccineService } from '../../services';

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface VaccinationRegistrationProps {
    visible: boolean;
    formRef: React.RefObject<FormInstance>;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

interface VaccinationRegistrationState {
    loading: boolean;
    vaccines: Vaccine[];
    nurses: Nurse[];
    patients: Patient[];
    institutes: VaccinationInstitute[];
}

export default class VaccinationRegistrationModal extends Component<VaccinationRegistrationProps, VaccinationRegistrationState> {

    private vaccineService: VaccineService;
    private instituteService: VaccinationInstituteService;
    private nurseService: NurseService;
    private patientService: PatientService;
    

    constructor(props: VaccinationRegistrationProps) {
        super(props);
        this.vaccineService = VaccineService.getInstance();
        this.instituteService = VaccinationInstituteService.getInstance();
        this.nurseService = NurseService.getInstance();
        this.patientService = PatientService.getInstance();
        this.state = {
            loading: true,
            patients: this.patientService.getPatients(),
            vaccines: [],
            nurses: [],
            institutes: [],
        };
    }

    componentDidMount() {
        async.parallel({
            patients: callback => {
                const patients = this.patientService.getPatients();
                callback(null, patients);
            },
            vaccines: callback => {
                this.vaccineService.listVaccines()
                    .then(vaccines => callback(null, vaccines))
                    .catch(error => callback(error));
            },
            nurses: callback => {
                this.nurseService.listNurses()
                    .then(nurses => callback(null, nurses))
                    .catch(error => callback(error));
            },
            institutes: callback => {
                this.instituteService.listVaccinationInstitutes()
                    .then(institutes => callback(null, institutes))
                    .catch(error => callback(error));
            },
        }, (error, { patients, vaccines, nurses, institutes }) => {
            if (error) {
                this.setState({ ...this.state, loading: false });
                message.error(error.message);
                return;
            }

            this.setState({
                ...this.state,
                loading: false,
                patients,
                vaccines,
                nurses,
                institutes,
            });

        });
    }

    onOk = () => {
        this.props.formRef.current.validateFields()
            .then(values => {
                this.props.onCreate(values);
            })
            .catch(message.error);
    }

    render() {
        const { visible, onCancel } = this.props;
        
        return (
            <Modal
                visible={visible}
                title="Registro de uma nova vacinação"
                okText="Registrar"
                cancelText="Cancelar"
                onCancel={onCancel}
                onOk={this.onOk}
            >
                <Form ref={this.props.formRef} layout="vertical">
                    <Form.Item>
                        <Form.Item
                            label="Paciente"
                            name={['patient', 'id']}
                            rules={[{ required: true, message: 'Entre com o paciente vacinado' }]}
                        >
                            <Select style={{ width: 200 }}>
                                {this.state.patients.map((patient: Patient) => (
                                    <Select.Option
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Localização"
                            name={['location']}
                            rules={[{ required: true, message: 'Entre com a localização do paciente.'}]}
                        >
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            label="Instituto de Vacinação"
                            name={['institute', 'id']}
                            rules={[{ required: true, message: 'Entre com instituto de vacinação' }]}
                        >
                            <Select style={{ width: 200 }}>
                                {this.state.institutes.map((institute: VaccinationInstitute) => (
                                    <Select.Option
                                        key={institute.id}
                                        value={institute.id}
                                    >
                                        {institute.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Enfermeiro(a)"
                            name={['nurse', 'id']}
                            rules={[{ required: true, message: 'Entre com a enfermeira que realizou a vacinação' }]}
                        >
                            <Select style={{ width: 150 }}>
                                {this.state.nurses.map((nurse: Nurse) => (
                                    <Select.Option
                                        key={nurse.id}
                                        value={nurse.id}
                                    >
                                        {nurse.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            label="Vacina"
                            name={['vaccine', 'id']}
                            rules={[{ required: true, message: 'Entre com o número de identificação da vacina' }]}
                        >
                            <Select style={{ width: 250 }}>
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
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
