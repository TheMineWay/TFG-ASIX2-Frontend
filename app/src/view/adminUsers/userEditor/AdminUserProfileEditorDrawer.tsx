import { Drawer } from 'antd';
import { UserModel } from '../../../services/auth/User.model';

type Props = {
    user?: UserModel;
    hide: () => void;
}

export default function AdminUserProfileEditorDrawer(props: Props) {
    return (
        <Drawer
            visible={props.user ? true : false}
            onClose={props.hide}
        >

        </Drawer>
    );
}