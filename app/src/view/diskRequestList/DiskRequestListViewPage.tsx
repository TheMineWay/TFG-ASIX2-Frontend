import { Divider } from "antd";
import { t } from "i18next";
import useDiskRequestList from "../../hooks/diskRequest/useDiskRequestList";
import useInventory from "../../hooks/inventory/useInventory";
import Loading from "../shared/Loading";
import DiskRequestListList from "./DiskRequestListList";

export default function DiskRequestListViewPage() {

    const { list, loading } = useDiskRequestList();
    const inventory = useInventory();

    if (loading || inventory.loading) return <Loading/>;

    return (
        <>
            <h1>{t('view.diskRequestList.Title')}</h1>
            <Divider/>
            <DiskRequestListList
                list={list}
                inventory={inventory}
            />
        </>
    );
}