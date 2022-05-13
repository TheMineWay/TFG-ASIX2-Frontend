import { CommentOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthState from "../../hooks/auth/useAuthState";
import useSecurityState from "../../hooks/security/useSecurityState";
import useUserState from "../../hooks/user/useUserState";
import AuthModal from "../auth/AuthModal";
import menuOptions, { MenuOption } from "../menu";
import LanguageDrawer from "./language/LanguageDrawer";
import './Header.css';

const { Item, SubMenu } = Menu;

const brand = require('../../resources/brand/logo.PNG');

export default function BaseHeader() {

    const navigate = useNavigate();
    const [authState, setAuthState] = useAuthState();
    const [userState] = useUserState();
    const [securityState] = useSecurityState();

    const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
    const [languageDrawer, setLanguageDrawer] = useState<boolean>(false);

    function constructOption(option: MenuOption): JSX.Element | null {
        if (option.permissions) {
            for (const permission of option.permissions) {
                if (!(securityState?.permissions.includes(permission))) return null;
            }
        }

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
            <LanguageDrawer
                visible={languageDrawer}
                hide={() => setLanguageDrawer(false)}
            />

            <AuthModal
                visible={authModal}
                hide={() => setAuthModal(null)}
            />

            <Header>
                <img
                    className="logo"
                    src={brand}
                />
                <Menu theme="dark" mode="horizontal" key={"mainMenu"}>
                    {
                        menuOptions
                            .filter((opt) => !opt.requiresAuth || (opt.requiresAuth && authState))
                            .map(constructOption)
                    }

                    {/* USER DROPDOWN */}

                    {
                        authState ? (
                            userState && ( // Is logged in
                                <SubMenu
                                    icon={<UserOutlined />}
                                    title={userState.name}
                                    onTitleClick={() => {
                                        navigate("/user/profile");
                                    }}
                                >
                                    <Item
                                        icon={<LogoutOutlined />}
                                        onClick={() => {
                                            setAuthState();
                                        }}
                                    >{t('common.actions.Logout')}</Item>
                                </SubMenu>
                            )
                        ) : ( // Is logged out
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

                    {/* LANGUAGE SELECTOR */}

                    <Item
                        icon={<CommentOutlined />}
                        onClick={() => setLanguageDrawer(true)}
                    >
                        {t('menu.options.lang.Title')}
                    </Item>
                </Menu>
            </Header>
        </>
    );
}