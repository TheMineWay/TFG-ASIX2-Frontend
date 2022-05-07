import { Tooltip } from "antd";
import moment from "moment";

type Props = {
    children?: Date;
    hideTime?: boolean;
    includeSeconds?: boolean;
}

export default function DateDisplay(props: Props) {

    if(!props.children) return <></>;

    const date = moment(props.children);

    const seconds = props.includeSeconds ? ':ss' : '';

    const shortDate = date.format('DD/MM/YYYY');
    const shortTime = props.hideTime ? '' : date.format(` HH:mm${seconds}`);

    const longDate = date.format('dddd Do MMMM YYYY');
    const longTime = props.hideTime ? '' : date.format(`, h:mm${seconds} a`)
    
    return (
        <Tooltip
            title={`${longDate}${longTime}`}
        >{`${shortDate}${shortTime}`}</Tooltip>
    );
}