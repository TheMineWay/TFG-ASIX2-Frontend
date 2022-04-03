import { Drawer } from 'antd';
import { AdminInventory } from '../../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import AdminInventoryEditForm from './AdminInventoryEditForm';

type Props = {
    item?: InventoryItem;
    hide: () => void;
    adminInventory: AdminInventory;
}

export default function AdminInventoryEditDrawer(props: Props) {
    return (
        <Drawer
            visible={props.item !== undefined}
            onClose={props.hide}
            title={props.item?.name}
        >
            {
                props.item && <AdminInventoryEditForm adminInventory={props.adminInventory} item={props.item}/>
            }
        </Drawer>
    );
}