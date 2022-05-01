import { CheckCircleOutlined, ClockCircleOutlined, PauseCircleOutlined, SendOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { t } from "i18next";
import moment from "moment";
import useCoins from "../../../hooks/coins/useCoins";
import { DiskRequestListItem, DiskRequestState } from "../../../hooks/diskRequest/useDiskRequestList";
import DateDisplay from "../../shared/DateDisplay";

type Props = {
    item: DiskRequestListItem;
}

export default function DiskRequestViewListItem(props: Props) {

    const { DisplayPrice } = useCoins();

    const StateTag = () => {
        const state: DiskRequestState = props.item.state;
        const text = t(`view.diskRequestList.list.states.${state}.Title`);

        switch (state) {
            case "pending": return (
                <Tag icon={<PauseCircleOutlined />} color='blue'>{text}</Tag>
            );
            case "delivered": return (
                <Tag icon={<CheckCircleOutlined />} color='green'>{text}</Tag>
            );
            case "processing": return (
                <Tag icon={<ClockCircleOutlined />} color='orange'>{text}</Tag>
            );
            case 'sent': return (
                <Tag icon={<SendOutlined />} color='magenta'>{text}</Tag>
            );
        }
    }

    return (
        <Card
            hoverable
            extra={<StateTag />}
            title={<DisplayPrice price={props.item.amount}/>}
            bodyStyle={{
                textAlign: 'justify',
            }}
        >
            <p>{t('view.diskRequestList.list.item.DeliveryDate')} <DateDisplay>{moment(props.item.createdAt).add(10, 'days').toDate()}</DateDisplay>.</p>
            <p>{t('view.diskRequestList.list.item.DeliveryAddress')} {props.item.address}.</p>
        </Card>
    );
}