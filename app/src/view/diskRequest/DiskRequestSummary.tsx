import { Card, Divider, Table } from "antd";
import { ExpandableConfig } from "antd/lib/table/interface";
import { t } from "i18next";
import useCoins from "../../hooks/coins/useCoins";
import { DiskRequestObj, generateDiskRequestBill } from "../../hooks/diskRequest/useDiskRequest";
import { InventoryItem } from "../../hooks/inventory/useInventory";

type Props = {
    inventory: InventoryItem[];
    request: DiskRequestObj;
}

type DisksTable = { name: string, price: number, items: (InventoryItem | undefined)[] };

export default function DiskRequestSummary(props: Props) {

    const { DisplayPrice } = useCoins();

    const inventory = props.inventory;

    const bill = generateDiskRequestBill(props.request, { inventory });

    const diskDatasource: DisksTable[] = bill.disks.map((disk) => ({
        ...disk.disk,
        items: disk.items,
    }));

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
            price += i?.disk?.price ?? 0;
            for (const item of i?.items ?? []) {
                price += item?.price ?? 0;
            }
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
            <Divider />
            <DisplayPrice price={finalDisksPrice()} />
        </Card>
    );
}