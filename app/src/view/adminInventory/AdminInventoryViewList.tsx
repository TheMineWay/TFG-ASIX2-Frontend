import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import useCoins from '../../hooks/coins/useCoins';
import useAdminInventory from '../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../hooks/inventory/useInventory';
import { listFilter } from '../../services/filters/genericFilter';
import Popconfirm from '../shared/Popconfirm';
import YesNo from '../shared/YesNo';
import AdminInventoryAddItemDrawer from './inventoryAdd/AdminInventoryAddItemDrawer';
import AdminInventoryEditDrawer from './inventoryEditor/AdminInventoryEditDrawer';

const { Column } = Table;

export default function AdminInventoryViewList() {

    const adminInventory = useAdminInventory();
    const { inventory, deleteItem, recoverItem } = adminInventory;
    const { DisplayPrice } = useCoins();

    const [editingItem, setEditingItem] = useState<InventoryItem>();
    const [addItem, setAddItem] = useState<boolean>(false);

    const [searchFilter, setSearchFilter] = useState<string>('');

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

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card>
                        <Space>
                            <Button
                                icon={<PlusOutlined />}
                                type='primary'
                                onClick={() => setAddItem(true)}
                            >
                                {t('view.inventory.list.actions.Add')}
                            </Button>
                            <Input.Search
                                allowClear
                                onSearch={(v) => setSearchFilter(v)}
                                defaultValue={searchFilter}
                            />
                        </Space>
                    </Card>
                </Col>
                <Col span={24}>
                    <Table
                        loading={inventory.loading}
                        dataSource={inventory.inventory?.filter((item) => listFilter([item.name, item.description], searchFilter))}
                    >
                        <Column
                            title={t('view.inventory.list.headers.Image')}
                            dataIndex='imageUrl'
                            render={(url: string) => <Avatar src={url}/>}
                        />
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
                            render={(p) => <DisplayPrice price={p}/>}
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
                            title={t('view.inventory.list.headers.IsDrive')}
                            dataIndex='isDrive'
                            render={(i: boolean) => <YesNo>{i}</YesNo>}
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