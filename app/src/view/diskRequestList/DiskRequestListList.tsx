import { Col, Row } from "antd";
import { useState } from "react";
import { DiskRequestListItem } from "../../hooks/diskRequest/useDiskRequestList";
import { UseInventory } from "../../hooks/inventory/useInventory";
import DiskRequestViewListItem from "../diskRequestList/shared/DiskRequestViewListItem";
import NoData from "../shared/NoData";
import DiskRequestViewDetailsDrawer from "./shared/DiskRequestViewDetailsDrawer";

type Props = {
    list: DiskRequestListItem[];
    inventory: UseInventory;
}

export default function DiskRequestListList(props: Props) {

    const [visualizing, setVisualizing] = useState<string | null>(null);

    if (props.list.length <= 0) return <NoData />;

    return (
        <>
            <DiskRequestViewDetailsDrawer
                onClose={() => setVisualizing(null)}
                item={props.list.find((i) => i.id === visualizing) ?? undefined}
                inventory={props.inventory}
            />
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
                                setVisualizing={setVisualizing}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}