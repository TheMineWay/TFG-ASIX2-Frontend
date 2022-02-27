import { ConfigProvider } from 'antd';
import './App.css';
import 'antd/dist/antd.variable.min.css';
import Layout from './view/layout/Layout';
import initI18n from './i18n/configureI18n';
import Router from './router/Router';

export default function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: '#9254de',
    },
  });

  initI18n();

  return (
    <>
      <Layout>
        <Router/>
      </Layout>
    </>
  );
}