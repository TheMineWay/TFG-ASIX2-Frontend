import { t } from "i18next";
import useDiskRequestList from "../../hooks/diskRequest/useDiskRequestList";
import DiskRequestListList from "./DiskRequestListList";

export default function DiskRequestListViewPage() {

    const { list } = useDiskRequestList();

    return (
        <>
            <h1>{t('view.diskRequestList.Title')}</h1>
            <DiskRequestListList
                list={list}
            />
        </>
    );
}