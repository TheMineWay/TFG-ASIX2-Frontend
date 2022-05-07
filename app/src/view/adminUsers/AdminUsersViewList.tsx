import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Popconfirm, Row, Space, Table } from 'antd';
import { t as tr } from 'i18next';
import { useState } from 'react';
import { UserAdmin } from '../../hooks/user/useUserAdmin';
import { UserModel } from '../../services/auth/User.model';
import { listFilter } from '../../services/filters/genericFilter';
import DateDisplay from '../shared/DateDisplay';
import AdminUserProfileEditorDrawer from './userEditor/AdminUserProfileEditorDrawer';

const { Column } = Table;

type Props = {
    userAdmin: UserAdmin;
}

export default function AdminUsersViewList(props: Props) {

    const t = (id: string): string => tr(`view.userAdmin.userTable.headers.${id}`);

    const [searchFilter, setSearchFilter] = useState<string>('');
    const usersList = props.userAdmin.userList.list?.filter((u) => listFilter([u.name, u.lastName, u.email, u.login], searchFilter));
    const loading = props.userAdmin.loading;

    const [userEditor, setUserEditor] = useState<UserModel>();

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

        return (
            <Space>
                <Button type='link'
                    onClick={() => setUserEditor(props.row)}
                >{tr('view.userAdmin.userTable.actions.Edit')}</Button>
                <Delete />
                <Ban />
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
                            render={() => <Avatar icon={<UserOutlined />} />}
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