import React, { Component } from 'react';
import { Button, Layout, Tooltip, message, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';

import Sidebar from './Sidebar'
import VaccinationRegistrationModal from '../forms/VaccinationRegistrationModal';
import { VaccinationService } from '../../services/VaccinationService';

const {
  Header, Content, Footer
} = Layout;


interface MainLayoutProps { };

interface MainLayoutState {
  loadingRegistration: boolean;
  visible: boolean;
};

class MainLayout extends Component<MainLayoutProps, MainLayoutState> {

  private vaccinationService: VaccinationService;
  private formRef: React.RefObject<FormInstance>;

  constructor(props: MainLayoutProps) {
    super(props);
    this.vaccinationService = VaccinationService.getInstance();
    this.formRef = React.createRef<FormInstance>();
    this.state = {
      loadingRegistration: false,
      visible: false,
    };
  }


  onCreate = values => {
    this.setState({ ...this.state, visible: true, loadingRegistration: true });
    this.vaccinationService.register({
      ...values,
      injectedAt: new Date(),
    })
      .then(results => {
        this.setState({ ...this.state, visible: false, loadingRegistration: false, });
        this.formRef.current?.resetFields();
        message.success('Registro de vacinação criado com sucesso!');
        console.log('resultado', results);
      })
      .catch(error => {
        this.setState({ ...this.state, visible: false, loadingRegistration: false });
        message.error(error.message);
      });
    
  }

  onCancel = () => {
    this.setState({ ...this.state, visible: false, loadingRegistration: false });
  };

  onNewVaccineRegistration = () => {
    this.setState({ ...this.state, visible: true, loadingRegistration: false });
  };

  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#40A9FF' }} >
            <Tooltip
              title="Adicione uma vacinação"
            >
              <Button
                type="default"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                style={{marginLeft: 16}}
                onClick={this.onNewVaccineRegistration}
              />
            </Tooltip>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{margin: 20}}>
              {children}
            </div>
            <div>
              <Spin tip="Carregando..." spinning={this.state.loadingRegistration} style={{zIndex: 1001}}>
                <VaccinationRegistrationModal
                  formRef={this.formRef}
                  visible={this.state.visible}
                  onCreate={this.onCreate}
                  onCancel={this.onCancel}
                />
              </Spin>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ITA - Instituto Técnologico de Aeronáutica</Footer>
        </Layout>
        <style jsx>
          {`
      .site-layout .site-layout-background {
        background: #40A9FF;
      }
    `}
        </style>
      </Layout>
    );
  }
}

export default MainLayout;
