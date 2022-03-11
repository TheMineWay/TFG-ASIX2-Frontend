import { LoginOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthState from "../../hooks/auth/useAuthState";
import AuthModal from "../auth/AuthModal";
import menuOptions, { MenuOption } from "../menu";

const { Item, SubMenu } = Menu;

export default function BaseHeader() {

    const navigate = useNavigate();
    const [authState] = useAuthState();

    const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);

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
            <AuthModal
                visible={authModal}
                hide={() => setAuthModal(null)}
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
                            <>
                                <Item
                                    icon={<LoginOutlined />}
                                    onClick={() => setAuthModal('login')}
                                >{t('menu.options.auth.login.Title')}</Item>
                                <Item
                                    icon={<UserAddOutlined />}
                                    onClick={() => setAuthModal('register')}
                                >{t('menu.options.auth.signup.Title')}</Item>
                            </>
                        )
                    }
                </Menu>
            </Header>
        </>
    );
}