import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyringe, faUserInjured } from '@fortawesome/free-solid-svg-icons';
import 'moment/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';

import Layout from '../components/layout/MainLayout';
import '../../assets/antd-custom.less';


library.add(faSyringe, faUserInjured);

export default function VaccineApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ConfigProvider locale={locale}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}