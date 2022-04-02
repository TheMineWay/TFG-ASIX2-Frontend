import { Button, Table } from 'antd';
import { t } from 'i18next';
import useCoins from '../../hooks/coins/useCoins';
import useAdminInventory from '../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../hooks/inventory/useInventory';
import Popconfirm from '../shared/Popconfirm';

const { Column } = Table;

export default function AdminInventoryViewList() {

    const { inventory, deleteItem, recoverItem } = useAdminInventory();
    const { displayPrice } = useCoins();

    const Actions = (props: { item: InventoryItem}): JSX.Element => {
        return (        
            <>
                <Button type='link'>{t('common.actions.Edit')}</Button>
                {
                    props.item.deletedAt ? (
                        <Popconfirm
                            title={t('view.inventory.list.actions.SureToRecover')}
                            onOk={async () => await recoverItem(props.item.id)}
                        >
                            <Button type='link'>{t('view.inventory.list.actions.Recover')}</Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title={t('view.inventory.list.actions.SureToDelete')}
                            onOk={async () => await deleteItem(props.item.id)}
                        >
                            <Button type='link'>{t('view.inventory.list.actions.Delete')}</Button>
                        </Popconfirm>
                    )
                }
            </>
        );
    }

return (
    <>
        <Table
            loading={inventory.loading}
            dataSource={inventory.inventory}
        >
            <Column
                title={t('view.inventory.list.headers.Id')}
                dataIndex='id'
            />
            <Column
                title={t('view.inventory.list.headers.Name')}
                dataIndex='name'
            />
            <Column
                title={t('view.inventory.list.headers.Description')}
                dataIndex='description'
            />
            <Column
                title={t('view.inventory.list.headers.Price')}
                dataIndex='price'
                render={displayPrice}
            />
            <Column
                title={t('view.inventory.list.headers.Discount')}
                dataIndex='discount'
                render={(v: number) => `${v.toString()}%`}
            />
            <Column
                title={t('view.inventory.list.headers.Stock')}
                dataIndex='stock'
            />
            <Column
                title={t('view.inventory.list.headers.Actions')}
                render={(v: any, row: InventoryItem) => <Actions item={row} />}
            />
        </Table>
    </>
);
}