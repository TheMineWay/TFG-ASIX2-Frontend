import { Tooltip } from "antd";
import moment from "moment";

type Props = {
    children: Date;
}

export default function DateDisplay(props: Props) {
    return (
        <Tooltip
            title={moment(props.children).toString()}
        >{moment(props.children).format('L LT')}</Tooltip>
    );
}