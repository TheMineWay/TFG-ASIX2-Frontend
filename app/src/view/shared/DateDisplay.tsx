import { Tooltip } from "antd";
import moment from "moment";

type Props = {
    children: Date;
    hideTime?: boolean;
}

export default function DateDisplay(props: Props) {

    const date = moment(props.children);

    const shortDate = date.format('DD/MM/YYYY');
    const shortTime = props.hideTime ? '' : date.format(' HH:mm');

    const longDate = date.format('dddd Do MMMM YYYY');
    const longTime = props.hideTime ? '' : date.format(', h:mm a')
    
    return (
        <Tooltip
            title={`${longDate}${longTime}`}
        >{`${shortDate}${shortTime}`}</Tooltip>
    );
}