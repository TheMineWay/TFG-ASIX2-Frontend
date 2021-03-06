import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Popconfirm, Row, Space, Table } from 'antd';
import { t as tr } from 'i18next';
import { useState } from 'react';
import { getBaseUrl } from '../../conf/conf';
import useRoles from '../../hooks/roles/useRoles';
import { UserAdmin } from '../../hooks/user/useUserAdmin';
import useUserRoles from '../../hooks/user/useUserRoles';
import { UserModel } from '../../services/auth/User.model';
import { listFilter } from '../../services/filters/genericFilter';
import DateDisplay from '../shared/DateDisplay';
import RoleTag from '../shared/RoleTag';
import AdminUserProfileEditorDrawer from './userEditor/AdminUserProfileEditorDrawer';
import AdminUserRolesEditorDrawer from './userEditor/AdminUserRolesEditorDrawer';

const { Column } = Table;

type Props = {
    userAdmin: UserAdmin;
}

export default function AdminUsersViewList(props: Props) {

    const t = (id: string): string => tr(`view.userAdmin.userTable.headers.${id}`);

    const userRoles = useUserRoles();
    const roles = useRoles();

    const [searchFilter, setSearchFilter] = useState<string>('');
    const usersList = props.userAdmin.userList.list?.filter((u) => listFilter([u.name, u.lastName, u.email, u.login], searchFilter));
    const loading = props.userAdmin.loading || userRoles.loading;

    const [userEditor, setUserEditor] = useState<UserModel>();
    const [userRoleEditor, setUserRoleEditor] = useState<{user: string, roles: string[]}>();

    const Filters = (): JSX.Element => {

        const FCol = (props: { children: JSX.Element | JSX.Element[] }): JSX.Element => (
            <Col
                xxl={4}
                xs={24}
                sm={12}
                md={8}
            >
                {props.children}
            </Col>
        );

        const SearchFilter = (): JSX.Element => (
            <Input.Search
                allowClear
                defaultValue={searchFilter}
                onSearch={(v) => setSearchFilter(v)}
            />
        );

        return (
            <Row gutter={[12, 12]}>
                <FCol>
                    <SearchFilter />
                </FCol>
            </Row>
        );
    };

    const deleteUser = async (id: string) => {
        await props.userAdmin.deleteUser(id);
    }

    const recoverUser = async (id: string) => {
        await props.userAdmin.recoverUser(id);
    }

    const banUser = async (id: string) => {
        props.userAdmin.banUser(id);
    }

    const unbanUser = async (id: string) => {
        props.userAdmin.unbanUser(id);
    }

    const UserActions = (props: { row: UserModel }): JSX.Element => {
        const Delete = (): JSX.Element => props.row.deletedAt ? (
            <Popconfirm
                title={tr('view.userAdmin.userTable.actions.SureToRecover')}
                onConfirm={() => recoverUser(props.row.id)}
            >
                <Button type='link'>{tr('view.userAdmin.userTable.actions.Recover')}</Button>
            </Popconfirm>
        ) : (
            <Popconfirm
                title={tr('view.userAdmin.userTable.actions.SureToDelete')}
                onConfirm={() => deleteUser(props.row.id)}
            >
                <Button type='link'>{tr('view.userAdmin.userTable.actions.Delete')}</Button>
            </Popconfirm >
        );

        const Ban = (): JSX.Element => props.row.isBanned ? (
            <Popconfirm
                onConfirm={() => unbanUser(props.row.id)}
                title={tr('view.userAdmin.userTable.actions.SureToUnban')}
            >
                <Button type='link'>{tr('view.userAdmin.userTable.actions.Unban')}</Button>
            </Popconfirm>
        ) : (
            <Popconfirm
                onConfirm={() => banUser(props.row.id)}
                title={tr('view.userAdmin.userTable.actions.SureToBan')}
            >
                <Button type='link'>{tr('view.userAdmin.userTable.actions.Ban')}</Button>
            </Popconfirm>
        );

        const EditRoles = () => (
            <Button
                type='link'
                onClick={() => {
                    setUserRoleEditor({
                        user: props.row.id,
                        roles: userRoles?.userRoles[props.row.id]?.map((r) => r.role) ?? [],
                    });
                }}
            >{tr('view.userAdmin.userTable.actions.EditRoles')}</Button>
        );

        return (
            <Space>
                <Button type='link'
                    onClick={() => setUserEditor(props.row)}
                >{tr('view.userAdmin.userTable.actions.Edit')}</Button>
                <Delete />
                <Ban />
                <EditRoles/>
            </Space>
        );
    };

    return (
        <>
            <AdminUserProfileEditorDrawer
                userAdmin={props.userAdmin}
                user={userEditor}
                hide={() => setUserEditor(undefined)}
            />

            <AdminUserRolesEditorDrawer
                user={userRoleEditor}
                hide={() => setUserRoleEditor(undefined)}
            />

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card>
                        <Filters />
                    </Card>
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={usersList}
                        loading={loading}
                    >
                        <Column
                            title={t('Avatar')}
                            dataIndex='id'
                            render={(id: string) => <Avatar src={getBaseUrl() + "/uploads/avatars/" + id} icon={<UserOutlined />} />}
                        />
                        <Column
                            title={t('Id')}
                            dataIndex='id'
                        />
                        <Column
                            title={t('Login')}
                            dataIndex='login'
                        />
                        <Column
                            title={t('Name')}
                            render={(r: any, record: UserModel) => `${record.name} ${record.lastName}`}
                        />
                        <Column
                            title={t('Email')}
                            dataIndex='email'
                        />
                        <Column
                            title={t('CreatedAt')}
                            dataIndex='createdAt'
                            render={(d: Date) => <DateDisplay includeSeconds>{d}</DateDisplay>}
                        />
                        <Column
                            title={t('Roles')}
                            dataIndex='id'
                            render={(id: string) => (
                                <>
                                    {
                                        userRoles.userRoles[id]?.map((role) => <RoleTag name={roles.roles?.find((r) => r.id === role.role)?.name}/>)
                                    }
                                </>
                            )}
                        />
                        <Column
                            title={t('DeletedAt')}
                            dataIndex='deletedAt'
                            filters={[
                                {
                                    text: tr('view.userAdmin.userTable.filters.NeverDeleted'),
                                    value: 'neverDeleted',
                                },
                                {
                                    text: tr('view.userAdmin.userTable.filters.Deleted'),
                                    value: 'deleted',
                                },
                            ]}
                            onFilter={(v, r: UserModel) => (!r.deletedAt && v === 'neverDeleted') || (r.deletedAt && v === 'deleted') ? true : false}
                            defaultFilteredValue={['neverDeleted']}
                            render={(d: Date) => <DateDisplay includeSeconds>{d}</DateDisplay>}
                        />
                        <Column
                            title={t('Actions')}
                            render={(v, row: UserModel) => <UserActions row={row} />}
                        />
                    </Table>
                </Col>
            </Row>
        </>
    );
}