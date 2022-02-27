import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";

const { Item } = Menu;

export default function BaseHeader() {
    return (
        <Header>
            <Menu theme="dark" mode="horizontal">
                
            </Menu>
        </Header>
    );
}