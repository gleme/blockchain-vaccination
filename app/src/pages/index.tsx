import { Component } from 'react';
import { Typography } from  'antd';

const { Title } = Typography;

interface HomeProps {}
interface HomeState {}

export default class Home extends Component<HomeProps, HomeState> {
  
  constructor(props: HomeProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Title level={4}>Seja bem vindo ao aplicativo de vacinação utilizando Blockchain</Title>
        <img
          width={400}
          src="https://static.vecteezy.com/system/resources/previews/000/833/598/non_2x/stop-coronavirus-covid-19-vaccine-design-vector.jpg"
        />
      </>
    );
  }

}
