import useDiskRequestList from "../../hooks/diskRequest/useDiskRequestList";
import DiskRequestListList from "./DiskRequestListList";

export default function DiskRequestListViewPage() {

    const { list } = useDiskRequestList();

    return (
        <>
            <DiskRequestListList
                list={list}
            />
        </>
    );
}