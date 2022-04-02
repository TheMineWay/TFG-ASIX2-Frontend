import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";
import BaseHeader from "./Header";
import './layout.css';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom'

type Props = {
    children: JSX.Element;
}

export default function BaseLayout(props: Props) {

    const location = useLocation();
    
    useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location.pathname]);

    return (
        <Layout>
            <BaseHeader/>
            <Content style={{minHeight: window.innerHeight}}>
                <div
                    className="site-layout-content"
                >
                    {props.children}
                </div>
            </Content>
        </Layout>
    );
}