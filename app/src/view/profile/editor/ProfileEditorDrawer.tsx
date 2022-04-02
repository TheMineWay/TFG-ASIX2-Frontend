import { Drawer } from "antd";
import ProfileEditorForm from "./ProfileEditorForm";

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function ProfileEditorDrawer(props: Props) {

    const hide = (): void => {
        props.hide();
    }

    return (
        <Drawer
            visible={props.visible}
            onClose={hide}
        >
            <ProfileEditorForm/>
        </Drawer>
    );
}