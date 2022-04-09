import { Table } from "antd";
import { t } from "i18next";
import moment from "moment";
import useSessionHistory, { Session } from "../../hooks/sessions/useSessionHistory";
import DateDisplay from "../shared/DateDisplay";

const { Column } = Table;

export default function ViewSessionHistory() {

    const sessions = useSessionHistory();

    return (
        <Table
            dataSource={sessions.sessionHistory.sessions}
            loading={sessions.sessionHistory.loading}
        >
            <Column
                dataIndex='id'
                title={t('view.profile.sessionHistory.table.headers.Id')}
            />
            <Column
                dataIndex='createdAt'
                title={t('view.profile.sessionHistory.table.headers.CreatedAt')}
                render={(date: Date) => <DateDisplay>{date}</DateDisplay>}
            />
            <Column
                dataIndex='ip'
                title={t('view.profile.sessionHistory.table.headers.Ip')}
            />
            <Column
                title={t('view.profile.sessionHistory.table.headers.ExpiredAt')}
                render={(r: any, row: Session) => {
                    if(moment(row.createdAt).add(1, 'days').isBefore(new Date())) {
                        return <DateDisplay>{moment(row.createdAt).add(1, 'days').toDate()}</DateDisplay>
                    }

                    return "";
                }}
            />
        </Table>
    );
}
