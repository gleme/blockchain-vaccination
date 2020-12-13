import { Component } from 'react';

interface HomeProps {}
interface HomeState {}

export default class Home extends Component<HomeProps, HomeState> {
  
  constructor(props: HomeProps) {
    super(props);
  }

  render() {
    return (
      <div>
        Ola mundo
      </div>
    );
  }

}
