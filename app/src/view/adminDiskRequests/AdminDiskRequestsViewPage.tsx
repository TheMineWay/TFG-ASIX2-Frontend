import useDiskRequestAdmin from "../../hooks/diskRequest/useDiskRequestAdmin";
import useInventory from "../../hooks/inventory/useInventory";
import AdminDiskRequestsList from "./AdminDiskRequestsList";

export default function AdminDiskRequestsViewPage() {

    const diskRequestsAdmin = useDiskRequestAdmin();
    const inventory = useInventory();

    return (
        <>
            <AdminDiskRequestsList
                diskRequestsAdmin={diskRequestsAdmin}
                inventory={inventory}
            />
        </>
    );
}