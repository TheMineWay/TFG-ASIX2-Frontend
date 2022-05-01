import { Col, Row } from "antd";
import { DiskRequestListItem } from "../../hooks/diskRequest/useDiskRequestList";
import DiskRequestViewListItem from "../diskRequestList/shared/DiskRequestViewListItem";

type Props = {
    list: DiskRequestListItem[];
}

export default function DiskRequestListList(props: Props) {
    return (
        <Row>
            {
                props.list.map((item) => (
                    <Col>
                        <DiskRequestViewListItem
                            item={item}
                        />
                    </Col>
                ))
            }
        </Row>
    );
}