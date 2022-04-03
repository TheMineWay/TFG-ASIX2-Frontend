import { Drawer } from 'antd';
import { t } from 'i18next';
import { AdminInventory } from '../../../hooks/inventory/useAdminInventory';
import AdminInventoryAddItemForm from './AdminInventoryAddItemForm';

type Props = {
    visible: boolean;
    hide: () => void;
    adminInventory: AdminInventory;
}

export default function AdminInventoryAddItemDrawer(props: Props) {
    return (
        <Drawer
            onClose={props.hide}
            visible={props.visible}
            title={t('view.inventory.list.actions.Add')}
        >
            <AdminInventoryAddItemForm
                adminInventory={props.adminInventory}
            />
        </Drawer>
    );
}