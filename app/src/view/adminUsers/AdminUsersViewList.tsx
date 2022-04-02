import { Table } from 'antd';
import { t as tr } from 'i18next';
import { UserAdmin } from '../../hooks/user/useUserAdmin';
import { UserModel } from '../../services/auth/User.model';

const { Column } = Table;

type Props = {
    userAdmin: UserAdmin;
}

export default function AdminUsersViewList(props: Props) {

    const usersList = props.userAdmin.userList.list;
    const loading = props.userAdmin.userList.loading;

    const t = (id: string): string => tr(`view.userAdmin.userTable.headers.${id}`);

    return (
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
    );
}