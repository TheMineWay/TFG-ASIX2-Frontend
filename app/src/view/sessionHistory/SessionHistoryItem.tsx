import { Timeline } from "antd";
import moment from "moment";
import { Session } from "../../hooks/sessions/useSessionHistory";
import DateDisplay from "../shared/DateDisplay";

type Props = {
    session: Session;
}

export default function SessionHistoryItem(props: Props) {
    const session = props.session;

    return (
        <Timeline.Item
            label={<DateDisplay>{session.createdAt}</DateDisplay>}
        >
            {session.id}
        </Timeline.Item>
    );
}