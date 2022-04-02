import { ConfigProvider } from 'antd';
import './App.css';
import 'antd/dist/antd.variable.min.css';
import initI18n from './i18n/configureI18n';
import Router from './router/Router';
import GlobalContext from './context/GlobalContext';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

export default function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: '#9254de',
    },
  });

  useEffect(() => {
    ReactGA.initialize('G-RV3WLC8PGQ');
  }, []);

  initI18n();

  return (
    <GlobalContext>
      <Router/>
    </GlobalContext>
  );
}