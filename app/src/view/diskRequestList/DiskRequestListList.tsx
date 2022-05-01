import { Col, Row } from "antd";
import { DiskRequestListItem } from "../../hooks/diskRequest/useDiskRequestList";
import DiskRequestViewListItem from "../diskRequestList/shared/DiskRequestViewListItem";
import NoData from "../shared/NoData";

type Props = {
    list: DiskRequestListItem[];
}

export default function DiskRequestListList(props: Props) {

    if(props.list.length <= 0) return <NoData/>;

    return (
        <Row
            gutter={[24, 24]}
        >
            {
                props.list.map((item) => (
                    <Col
                        xs={24}
                        sm={12}
                        xl={8}
                        xxl={6}
                    >
                        <DiskRequestViewListItem
                            item={item}
                        />
                    </Col>
                ))
            }
        </Row>
    );
}