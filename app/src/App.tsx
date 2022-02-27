import { Button, ConfigProvider } from 'antd';
import './App.css';
import 'antd/dist/antd.variable.min.css';
import Layout from './view/layout/Layout';

export default function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: '#9254de',
    },
  });

  return (
    <>
      <Layout>
        <>
          <Button>a</Button>
        </>
      </Layout>
    </>
  );
}