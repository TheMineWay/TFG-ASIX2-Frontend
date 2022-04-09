import { Table, Tooltip } from "antd";
import { t } from "i18next";
import moment from "moment";
import useGeolocation from "../../hooks/geolocation/useGeolocation";
import useSessionHistory, { Session } from "../../hooks/sessions/useSessionHistory";
import DateDisplay from "../shared/DateDisplay";
import GeoCard from "../shared/GeoCard";

const { Column } = Table;

export default function ViewSessionHistory() {

    const sessions = useSessionHistory();
    const geo = useGeolocation();

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
                                        width={400}
                                    />
                                )}
                                color='white'
                            >
                                {ip}
                            </Tooltip>
                        )
                    );
                }}
            />
            <Column
                title={t('view.profile.sessionHistory.table.headers.ExpiredAt')}
                render={(r: any, row: Session) => {
                    if (moment(row.createdAt).add(1, 'days').isBefore(new Date())) {
                        return <DateDisplay>{moment(row.createdAt).add(1, 'days').toDate()}</DateDisplay>
                    }

                    return "";
                }}
            />
        </Table>
    );
}
