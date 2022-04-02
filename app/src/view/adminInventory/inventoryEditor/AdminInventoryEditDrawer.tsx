import { Drawer } from 'antd';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import AdminInventoryEditForm from './AdminInventoryEditForm';

type Props = {
    item?: InventoryItem;
    hide: () => void;
}

export default function AdminInventoryEditDrawer(props: Props) {
    return (
        <Drawer
            visible={props.item !== undefined}
            onClose={props.hide}
            title={props.item?.name}
        >
            {
                props.item && <AdminInventoryEditForm item={props.item}/>
            }
        </Drawer>
    );
}