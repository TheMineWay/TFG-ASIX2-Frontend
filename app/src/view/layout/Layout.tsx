import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import BaseHeader from "./Header";
import './layout.css';

type Props = {
    children: JSX.Element;
}

export default function BaseLayout(props: Props) {
    return (
        <Layout>
            <BaseHeader/>
            <Content>
                <div
                    className="site-layout-content"
                >
                    {props.children}
                </div>
            </Content>
        </Layout>
    );
}