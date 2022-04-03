import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { t } from 'i18next';
import useCoins from '../../hooks/coins/useCoins';
import usePayments from '../../hooks/payments/usePayments';
import DateDisplay from '../shared/DateDisplay';
import UserDisplay from '../shared/UserDisplay';

export default function ViewAdminPaymentsList() {

    const { DisplayPrice } = useCoins();
    const { payments, loading } = usePayments();

    const dataSource = payments;

    console.log(payments);

    return (
        <>
            <Table
                loading={loading}
                dataSource={dataSource}
            >
                <Column
                    title={t('view.paymentsAdmin.list.headers.Id')}
                    dataIndex='id'
                />
                <Column
                    title={t('view.paymentsAdmin.list.headers.User')}
                    dataIndex='user'
                    render={(id) => <UserDisplay id={id}/>}
                />
                <Column
                    title={t('view.paymentsAdmin.list.headers.Last4Card')}
                    dataIndex='card'
                />
                <Column
                    title={t('view.paymentsAdmin.list.headers.Amount')}
                    dataIndex='amount'
                    render={(p: number) => <DisplayPrice price={p}/>}
                />
                <Column
                    title={t('view.paymentsAdmin.list.headers.CreatedAt')}
                    dataIndex='createdAt'
                    render={(d: Date) => <DateDisplay>{d}</DateDisplay>}
                />
            </Table>
        </>
    );
}
