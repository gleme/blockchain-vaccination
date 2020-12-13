import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Layout, Typography, Row, Col } from 'antd';
const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = () => {

    return (
        <Sider theme="light">
          <div className="logo">
            <Row>
                <Col span={4}><FontAwesomeIcon icon="syringe" /></Col>
                <Col span={20}><Title level={4}><Link href="/">VacApp</Link></Title></Col>
            </Row>          
          </div>
          <Menu mode="inline" theme="light">
            <Menu.Item
              key="sub1"
              icon={<FontAwesomeIcon icon="user-injured" />}
            >
              <Link href='/vaccines'>Vacinas por Paciente</Link>
            </Menu.Item>
            <Menu.Item
              key="sub2"
              icon={<FontAwesomeIcon icon="syringe" />}
            >
              <Link href='/patients'>Pacientes por Vacina</Link>
            </Menu.Item>
          </Menu>
          <style jsx>
          {`
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 10px;
      }
      
      .site-layout .site-layout-background {
        background: #40A9FF;
      }
      

      .ant-layout-sider-trigger {
      }

    `}
        </style>
        </Sider>
    );

};

export default Sidebar;