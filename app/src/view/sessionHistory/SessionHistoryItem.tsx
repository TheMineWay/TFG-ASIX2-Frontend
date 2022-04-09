import { Timeline } from "antd";
import { Session } from "../../hooks/sessions/useSessionHistory";

type Props = {
    session: Session;
}

export default function SessionHistoryItem(props: Props) {
    return (
        <Timeline.Item>
            {props.session.id}
        </Timeline.Item>
    );
}