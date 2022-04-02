import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Space, Table } from 'antd';
import { t as tr } from 'i18next';
import { useState } from 'react';
import { UserAdmin } from '../../hooks/user/useUserAdmin';
import { UserModel } from '../../services/auth/User.model';
import { listFilter } from '../../services/filters/genericFilter';

const { Column } = Table;

type Props = {
    userAdmin: UserAdmin;
}

export default function AdminUsersViewList(props: Props) {

    const t = (id: string): string => tr(`view.userAdmin.userTable.headers.${id}`);

    const [ searchFilter, setSearchFilter ] = useState<string>('');
    const usersList = props.userAdmin.userList.list?.filter((u) => listFilter([u.name, u.lastName, u.email], searchFilter));
    const loading = props.userAdmin.userList.loading;

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
            <Input
                prefix={<SearchOutlined/>}
                allowClear
            />
        );

        return (
            <Row gutter={[12, 12]}>
                <FCol>
                    <SearchFilter/>
                </FCol>
            </Row>
        );
    };

    return (
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
                        title={t('Id')}
                        dataIndex='id'
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
                    />
                </Table>
            </Col>
        </Row>
    );
}