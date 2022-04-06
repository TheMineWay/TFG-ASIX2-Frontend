import { Drawer } from 'antd';
import { UserAdmin } from '../../../hooks/user/useUserAdmin';
import { UserModel } from '../../../services/auth/User.model';
import AdminUserProfileEditorForm from './AdminUserProfileEditorForm';

type Props = {
    userAdmin: UserAdmin;
    user?: UserModel;
    hide: () => void;
}

export default function AdminUserProfileEditorDrawer(props: Props) {
    const user = props.user;

    return (
        <Drawer
            visible={props.user ? true : false}
            onClose={props.hide}
            title={user?.name + " " + user?.lastName}
        >
            {
                user && (
                    <AdminUserProfileEditorForm
                        userAdmin={props.userAdmin}
                        user={props.user!}
                        hide={props.hide}
                    />
                )
            }
        </Drawer>
    );
}