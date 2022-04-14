import { Card } from "antd";
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

    //const billTree = 

    return (
        <Card
            hoverable
        >
            <DisplayPrice price={finalDisksPrice()}/>
        </Card>
    );
}