import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import menuOptions, { MenuOption } from "../menu";

const { Item, SubMenu } = Menu;

export default function BaseHeader() {

    const navigate = useNavigate();

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
        <Header>
            <Menu theme="dark" mode="horizontal" key={"mainMenu"}>
                {
                    menuOptions.map(constructOption)
                }
            </Menu>
        </Header>
    );
}