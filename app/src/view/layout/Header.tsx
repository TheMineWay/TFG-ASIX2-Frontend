import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthState from "../../hooks/auth/useAuthState";
import LoginModal from "../login/LoginModal";
import menuOptions, { MenuOption } from "../menu";

const { Item, SubMenu } = Menu;

export default function BaseHeader() {

    const navigate = useNavigate();
    const [authState] = useAuthState();

    const [loginVisible, setLoginVisibility] = useState<boolean>(false);

    function constructOption(option: MenuOption): JSX.Element {
        const text = t(`menu.options.${option.text}.Title`);

        if (option.children) {
            return (
                <SubMenu icon={option.icon} key={option.key} title={text} onTitleClick={() => option.path && navigate(option.path)}>
                    {
                        option.children.map(constructOption)
                    }
                </SubMenu>
            );
        }
        return <Item icon={option.icon} key={option.key} onClick={() => option.path && navigate(option.path)}>{text}</Item>;
    }

    return (
        <>
            <LoginModal
                visible={loginVisible}
                hide={() => setLoginVisibility(false)}
            />

            <Header>
                <Menu theme="dark" mode="horizontal" key={"mainMenu"}>
                    {
                        menuOptions.map(constructOption)
                    }
                    {
                        authState ? (
                            <Item>{authState.user.name}</Item>
                        ) : (
                            <Item
                                icon={<UserOutlined />}
                                onClick={() => setLoginVisibility(true)}
                            >{t('menu.options.login.Title')}</Item>
                        )
                    }
                </Menu>
            </Header>
        </>
    );
}