import { Col, Drawer, Row, Switch } from 'antd';
import useAuthState from '../../../hooks/auth/useAuthState';
import useRoles, { Role } from '../../../hooks/roles/useRoles';
import useUsers from '../../../hooks/user/useUsers';
import request from '../../../services/api/Request';
import Loading from '../../shared/Loading';
import UserDisplay from '../../shared/UserDisplay';

type Props = {
    user?: { user: string, roles: string[] };
    hide: () => void;
}

export default function AdminUserRolesEditorDrawer(props: Props) {

    const users = useUsers();
    const roles = useRoles();

    const [authState] = useAuthState();

    const loading = roles.loading;

    const RoleSelect = (p: { role: Role }) => (
        <Col
            span={12}
            style={{
                display: 'flex',
                gap: 20,
            }}
        >
            <Switch
                onChange={async (v) => {
                    await setRole(p.role.id, v);
                }}
                defaultChecked={props.user?.roles.includes(p.role.id)}
            />
            <p>{p.role.name}</p>
        </Col>
    );

    async function setRole(roleId: string, action: boolean) {
        await request<{}>('post', '/actions/admin/users/setUserRole', {
            userId: props.user!.user,
            roleId,
            action: action ? '1' : '0',
        }, { authCredentials: authState });
    }

    return (
        <Drawer
            visible={props.user !== undefined}
            onClose={props.hide}
            title={props.user && <UserDisplay id={props.user.user!} users={users} />}
        >

            {
                loading ? (
                    <Loading />
                ) : (
                    <Row
                        gutter={[12, 12]}
                    >
                        {
                            roles.roles?.map((role) => <RoleSelect role={role} />)
                        }
                    </Row>
                )
            }
        </Drawer>
    );
}