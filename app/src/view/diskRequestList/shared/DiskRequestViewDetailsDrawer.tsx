import { Drawer, Skeleton } from "antd";
import useDetailedDiskRequest from "../../../hooks/diskRequest/useDetailedDiskRequest";
import { DiskRequestListItem } from "../../../hooks/diskRequest/useDiskRequestList";
import DateDisplay from "../../shared/DateDisplay";

type Props = {
    onClose: () => void;
    item?: DiskRequestListItem;
}

export default function DiskRequestViewDetailsDrawer(props: Props) {

    const { purchase, loading } = useDetailedDiskRequest(props.item?.id ?? null);
    
    return (
        <Drawer
            title={<><DateDisplay>{purchase?.purchase.createdAt}</DateDisplay></>}
            onClose={props.onClose}
            visible={props.item !== undefined}
        >
            <Skeleton
                loading={loading}
            >
                
            </Skeleton>
        </Drawer>
    );
}