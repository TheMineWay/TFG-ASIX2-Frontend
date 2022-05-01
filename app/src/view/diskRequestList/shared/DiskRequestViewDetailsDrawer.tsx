import { Drawer } from "antd";
import { DiskRequestListItem } from "../../../hooks/diskRequest/useDiskRequestList";

type Props = {
    onClose: () => void;
    item?: DiskRequestListItem;
}

export default function DiskRequestViewDetailsDrawer(props: Props) {
    return (
        <Drawer
            onClose={props.onClose}
            visible={props.item !== undefined}
        >

        </Drawer>
    );
}