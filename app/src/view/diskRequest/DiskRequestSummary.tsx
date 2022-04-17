import { DownOutlined } from "@ant-design/icons";
import { Card, Divider, Tree, TreeDataNode } from "antd";
import useCoins from "../../hooks/coins/useCoins";
import { DiskRequestObj, generateDiskRequestBill } from "../../hooks/diskRequest/useDiskRequest";
import { InventoryItem } from "../../hooks/inventory/useInventory";

type Props = {
    inventory: InventoryItem[];
    request: DiskRequestObj;
}

export default function DiskRequestSummary(props: Props) {

    const { DisplayPrice } = useCoins();

    const inventory = props.inventory;

    const bill = generateDiskRequestBill(props.request, { inventory });

    const finalDisksPrice = (): number => {
        let price = 0;

        for(const i of bill.disks) {
            price += i?.disk?.price ?? 0;
            for(const item of i?.items ?? []) {
                price += item?.price ?? 0;
            }
        }

        return price;
    }

    const billTree: TreeDataNode[] = bill?.disks?.map((disk) => ({
        title: <><b>{disk?.disk?.name}</b> <DisplayPrice price={disk?.disk?.price}/></>,
        key: (Math.random() * 999999).toString(),
        children: disk.items.map((item) => ({
            title: <><b>{item?.name}</b> <DisplayPrice price={item?.price ?? 0}/></>,
            key: item?.id ?? '',
        }))
    }))

    return (
        <Card
            hoverable
        >
            <Tree
                treeData={billTree ?? []}
                showLine
                switcherIcon={<DownOutlined/>}
            />
            <Divider/>
            <DisplayPrice price={finalDisksPrice()}/>
        </Card>
    );
}