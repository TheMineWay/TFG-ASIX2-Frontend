import { CommentOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthState from "../../hooks/auth/useAuthState";
import useLanguage from "../../hooks/language/useLanguage";
import useSecurityState from "../../hooks/security/useSecurityState";
import useUserState from "../../hooks/user/useUserState";
import { Languages } from "../../i18n/configureI18n";
import AuthModal from "../auth/AuthModal";
import menuOptions, { MenuOption } from "../menu";

const { Item, SubMenu } = Menu;

export default function BaseHeader() {

    const navigate = useNavigate();
    const [authState, setAuthState] = useAuthState();
    const [userState] = useUserState();
    const [securityState] = useSecurityState();
    const { setLanguage } = useLanguage();

    const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);

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

    const languageMenu = (
        <Menu>
            <Item
                onClick={() => setLanguage(Languages.ca)}
            >
                Català
            </Item>
            <Item
                onClick={() => setLanguage(Languages.es)}
            >
                Espanyol
            </Item>
        </Menu>
    );

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
                    >
                        <Dropdown
                            overlay={languageMenu}
                            placement='bottomCenter'
                            arrow
                        >
                            <a>{t('menu.options.lang.Title')}</a>
                        </Dropdown>
                    </Item>
                </Menu>
            </Header>
        </>
    );
}