import { Drawer } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UserModel } from "../../../services/auth/User.model";
import ProfileEditorForm from "./ProfileEditorForm";

type Props = {
    visible: boolean;
    setVisibility: (v: boolean) => void;
}

export default function ProfileEditorDrawer(props: Props) {

    const [form] = useForm<UserModel>();

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