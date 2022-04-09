import { Card, Col, Row, Timeline } from "antd";
import useSessionHistory from "../../hooks/sessions/useSessionHistory";
import Container from "../shared/Container";
import Loading from "../shared/Loading";
import SessionHistoryItem from "./SessionHistoryItem";

export default function ViewSessionHistory() {

    const sessions = useSessionHistory();

    const SessionsTimeline = () => {

        const sessionsList = sessions.sessionHistory.sessions!;

        return (
            <Row
                justify='center'
                style={{width: '100%'}}
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
                        >
                            {
                                sessionsList.map((session) => <SessionHistoryItem session={session} />)
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
