import { Drawer } from "antd";
import ProfileEditorForm from "./ProfileEditorForm";

type Props = {
    visible: boolean;
    setVisibility: (v: boolean) => void;
}

export default function ProfileEditorDrawer(props: Props) {

    const hide = (): void => {
        props.setVisibility(false);
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