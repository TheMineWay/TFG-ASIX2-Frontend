import { Card, Timeline } from "antd";
import useSessionHistory from "../../hooks/sessions/useSessionHistory";
import Container from "../shared/Container";
import Loading from "../shared/Loading";
import SessionHistoryItem from "./SessionHistoryItem";

export default function ViewSessionHistory() {

    const sessions = useSessionHistory();

    const SessionsTimeline = () => {

        const sessionsList = sessions.sessionHistory.sessions!;

        return (
            <Card>
                <Timeline>
                    {
                        sessionsList.map((session) => <SessionHistoryItem session={session} />)
                    }
                </Timeline>
            </Card>
        );
    };

    return (
        <Container>
            {sessions.sessionHistory.loading || !sessions.sessionHistory.sessions ? <Loading /> : <SessionsTimeline />}
        </Container>
    );
}
