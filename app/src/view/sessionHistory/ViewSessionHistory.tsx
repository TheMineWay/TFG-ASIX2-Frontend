import { Card, Col, Row, Timeline } from "antd";
import useSessionHistory, { Session } from "../../hooks/sessions/useSessionHistory";
import Container from "../shared/Container";
import Loading from "../shared/Loading";

export default function ViewSessionHistory() {

    const sessions = useSessionHistory();

    const SessionHistoryItem = (props: { session: Session }) => {
        const session = props.session;

        return (
            <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
        );
    }

    const SessionsTimeline = () => {

        const sessionsList = sessions.sessionHistory.sessions!;

        return (
            <Row
                justify='center'
                style={{ width: '100%' }}
            >
                <Col
                    xs={24}
                    sm={22}
                    md={20}
                    lg={18}
                    xl={16}
                    xxl={14}
                >
                    <Card>
                        <Timeline
                            mode="left"
                            style={{ width: '100%' }}
                        >
                            {
                                sessionsList.map((session) => (
                                    <Timeline.Item label={session.createdAt.toString()}>
                                        {
                                            session.ip
                                        }
                                    </Timeline.Item>
                                ))
                            }
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {sessions.sessionHistory.loading || !sessions.sessionHistory.sessions ? <Loading /> : <SessionsTimeline />}
            </div>
        </Container>
    );
}
