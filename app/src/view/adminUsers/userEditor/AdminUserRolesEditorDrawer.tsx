import { Col, Drawer, Row, Switch } from 'antd';
import useRoles, { Role } from '../../../hooks/roles/useRoles';
import useUsers from '../../../hooks/user/useUsers';
import Loading from '../../shared/Loading';
import UserDisplay from '../../shared/UserDisplay';

type Props = {
    user?: { user: string, roles: string[] };
    hide: () => void;
}

export default function AdminUserRolesEditorDrawer(props: Props) {

    const users = useUsers();
    const roles = useRoles();

    const loading = roles.loading;

    console.log(roles.roles);
    console.log(props.user?.roles);
    const RoleSelect = (p: { role: Role }) => (
        <Col
            span={12}
            style={{
                display: 'flex',
                gap: 20,
            }}
        >
            <Switch
                onChange={(v) => { }}
                defaultChecked={props.user?.roles.includes(p.role.id)}
            />
            <p>{p.role.name}</p>
        </Col>
    );

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