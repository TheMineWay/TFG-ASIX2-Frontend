import { Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import useGeolocation from '../../hooks/geolocation/useGeolocation';
import useLogs, { LogAction } from '../../hooks/logsViewer/useLogs';
import useUsers from '../../hooks/user/useUsers';
import GeoCard from '../shared/GeoCard';
import UserDisplay from '../shared/UserDisplay';

type Props = {}

export default function ViewLogsTable(props: Props) {

    const users = useUsers();
    const logs = useLogs();
    const geo = useGeolocation();

    const logActions: LogAction[] = [LogAction.login, LogAction.register];

    const { t } = useTranslation();

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
                render={(id: string) => <UserDisplay id={id} users={users}/>}
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
                onFilter={(value, record: any) => value === record.action}
            />
            <Column
                dataIndex='ip'
                title={t('view.logs.table.columns.Ip')}
                render={(ip: string) => {

                    const gl = geo.getByIp(ip);

                    return (
                        gl === undefined || !gl.latitude ? (
                            <>{ ip }</>
                        ) : (
                            <Tooltip
                                title={(
                                    <GeoCard
                                        includeCard={false}
                                        geolocation={gl}
                                        width={'100%'}
                                    />
                                )}
                                color='white'
                                style={{width: 900}}
                            >
                                {ip}
                            </Tooltip>
                        )
                    );
                }}
            />
            <Column
                dataIndex='createdAt'
                title={t('view.logs.table.columns.Date')}
                sorter={(a: Date, b: Date) => moment(a).isBefore(b) ? -1 : 1}
            />
        </Table>
    );
}