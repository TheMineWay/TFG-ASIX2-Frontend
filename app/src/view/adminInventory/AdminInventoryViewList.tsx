import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Table } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import useCoins from '../../hooks/coins/useCoins';
import useAdminInventory from '../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../hooks/inventory/useInventory';
import Popconfirm from '../shared/Popconfirm';
import AdminInventoryAddItemDrawer from './inventoryAdd/AdminInventoryAddItemDrawer';
import AdminInventoryEditDrawer from './inventoryEditor/AdminInventoryEditDrawer';

const { Column } = Table;

export default function AdminInventoryViewList() {

    const adminInventory = useAdminInventory();
    const { inventory, deleteItem, recoverItem } = adminInventory;
    const { displayPrice } = useCoins();

    const [editingItem, setEditingItem] = useState<InventoryItem>();
    const [addItem, setAddItem] = useState<boolean>(false);

    const Actions = (props: { item: InventoryItem }): JSX.Element => {
        return (
            <>
                <Button type='link'
                    onClick={() => setEditingItem(props.item)}
                >{t('common.actions.Edit')}</Button>
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
            <AdminInventoryEditDrawer
                adminInventory={adminInventory}
                item={editingItem}
                hide={() => setEditingItem(undefined)}
            />

            <AdminInventoryAddItemDrawer
                adminInventory={adminInventory}
                visible={addItem}
                hide={() => setAddItem(false)}
            />

            <Row gutter={[24,24]}>
                <Col span={24}>
                    <Card>
                        <Button
                            icon={<PlusOutlined/>}
                            type='primary'
                            onClick={() => setAddItem(true)}
                        >
                            {t('view.inventory.list.actions.Add')}
                        </Button>
                    </Card>
                </Col>
                <Col span={24}>
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
                            title={t('view.inventory.list.headers.DeletedAt')}
                            dataIndex='deletedAt'
                            defaultFilteredValue={['neverDeleted']}
                            filters={[
                                {
                                    text: t('view.inventory.list.filters.Deleted'),
                                    value: 'deleted'
                                },
                                {
                                    text: t('view.inventory.list.filters.NeverDeleted'),
                                    value: 'neverDeleted'
                                }
                            ]}
                            onFilter={(v, row: InventoryItem) => ((v === 'deleted' && row.deletedAt) || (v === 'neverDeleted' && !row.deletedAt)) ? true : false}
                        />
                        <Column
                            title={t('view.inventory.list.headers.Actions')}
                            render={(v: any, row: InventoryItem) => <Actions item={row} />}
                        />
                    </Table>
                </Col>
            </Row>
        </>
    );
}