import { Card, Divider, Table } from "antd";
import { ExpandableConfig } from "antd/lib/table/interface";
import { useTranslation } from 'react-i18next';
import useCoins from "../../hooks/coins/useCoins";
import { DiskRequestObj, generateDiskRequestBill } from "../../hooks/diskRequest/useDiskRequest";
import { InventoryItem } from "../../hooks/inventory/useInventory";

type Props = {
    inventory: InventoryItem[];
    request: DiskRequestObj;
}

type DisksTable = { name: string, price: number, items: (InventoryItem | undefined)[] };

export default function DiskRequestSummary(props: Props) {

    const { t, i18n } = useTranslation();
    const { DisplayPrice } = useCoins();

    const inventory = props.inventory;

    const bill = generateDiskRequestBill(props.request, { inventory });

    const diskDatasource: DisksTable[] = bill.disks.map((disk) => ({
        ...disk.disk,
        amount: disk.amount,
        items: disk.items,
    }));

    const calculateItemsPrice = (items: InventoryItem[]): number => {
        let p = 0;

        for(const item of items) p += item.price;

        return p;
    }

    const diskExpandable: ExpandableConfig<DisksTable> = {
        expandedRowRender: (row) => {
            return (
                <Table
                    dataSource={row.items as any}
                    pagination={false}
                >
                    <Table.Column
                        title={t('view.diskRequest.summary.table.headers.Name')}
                        dataIndex={'name'}
                    />
                    <Table.Column
                        title={t('view.diskRequest.summary.table.headers.Price')}
                        dataIndex={'price'}
                        render={(p: number) => <DisplayPrice price={p} />}
                    />
                </Table>
            );
        }
    }

    const finalDisksPrice = (): number => {
        let price = 0;

        for (const i of bill.disks) {
            let dprice = i?.disk?.price ?? 0;
            for (const item of i?.items ?? []) {
                dprice += item?.price ?? 0;
            }

            price += dprice * i.amount;
        }

        return price;
    }

    return (
        <Card
            hoverable
        >
            <Table
                dataSource={diskDatasource}
                expandable={diskExpandable}
                pagination={false}
                scroll={{x: 300}}
            >
                <Table.Column
                    title={t('view.diskRequest.summary.table.headers.Name')}
                    dataIndex={'name'}
                    width={100}
                    fixed='left'
                />
                <Table.Column
                    title={t('view.diskRequest.summary.table.headers.Amount')}
                    dataIndex={'amount'}
                />
                <Table.Column
                    title={t('view.diskRequest.summary.table.headers.Price')}
                    dataIndex={'price'}
                    render={(p: number, row: {amount: number, items: InventoryItem[]}) => <DisplayPrice price={((calculateItemsPrice(row.items) + p) * row.amount)} />}
                />
            </Table>
            <Divider />
            <DisplayPrice price={finalDisksPrice()} />
        </Card>
    );
}