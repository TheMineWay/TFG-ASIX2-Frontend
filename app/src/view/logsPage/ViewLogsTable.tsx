import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { t } from 'i18next';
import moment from 'moment';
import useLogs, { LogAction } from '../../hooks/logs/useLogs';

type Props = {}

export default function ViewLogsTable(props: Props) {

    const logs = useLogs();

    const logActions: LogAction[] = [LogAction.login, LogAction.register];

    return (
        <Table
            dataSource={logs.data}
            loading={logs.isLoading}
        >
            <Column
                dataIndex='id'
                title={t('view.logs.table.columns.Id')}
            />
            <Column
                dataIndex='user'
                title={t('view.logs.table.columns.User')}
            />
            <Column
                dataIndex='action'
                title={t('view.logs.table.columns.Action')}
                render={(action: string) => t(`view.logs.table.columns.actions.${action}`)}
                filters={
                    logActions.map((action) => ({
                        text: t(`view.logs.table.columns.actions.${action}`),
                        value: action,
                    }))
                }
            />
            <Column
                dataIndex='ip'
                title={t('view.logs.table.columns.Ip')}
            />
            <Column
                dataIndex='createdAt'
                title={t('view.logs.table.columns.Date')}
                sorter={(a: Date, b: Date) => moment(a).isBefore(b) ? -1 : 1}
            />
        </Table>
    );
}