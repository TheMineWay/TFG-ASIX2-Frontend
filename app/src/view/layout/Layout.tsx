import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import BaseHeader from "./Header";
import './layout.css';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom'
import OpinionNotification from "./opinions/OpinionNotification";
import Footer from "./Footer";
import CookiesAlert from "./CookiesAlert";

type Props = {
    children: JSX.Element;
}

export default function BaseLayout(props: Props) {

    const location = useLocation();
    const [height, setHeight] = useState<number>(window.innerHeight);
    
    useEffect(() => {
        window.addEventListener('resize', () => setHeight(window.innerHeight));
    }, []);

    useEffect(() => {
        ReactGA.pageview(location.pathname);
    }, [location.pathname]);

    return (
        <Layout>
            <BaseHeader/>
            <Content style={{minHeight: height - 135}}>
                <div
                    className="site-layout-content"
                >
                    {props.children}
                </div>
            </Content>
            <OpinionNotification/>
            <CookiesAlert/>
            <Footer/>
        </Layout>
    );
}