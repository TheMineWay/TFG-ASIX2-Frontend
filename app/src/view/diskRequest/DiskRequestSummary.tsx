import { Card } from "antd";
import useCoins from "../../hooks/coins/useCoins";
import { DiskRequestObj } from "../../hooks/diskRequest/useDiskRequest";
import { InventoryItem } from "../../hooks/inventory/useInventory";

type Props = {
    inventory: InventoryItem[];
    request: DiskRequestObj;
}

export default function DiskRequestSummary(props: Props) {

    const { DisplayPrice } = useCoins();

    const inventory = props.inventory;

    const disks = props.request.disks;

    const finalDisksPrice = (): number => {
        let price = 0;

        for(const disk of Object.entries(disks)) {
            const items = inventory.filter((item) => disk[1].items.includes(item.id));
            const diskItem = inventory.find((item) => item.id === disk[1].disk);

            price += diskItem?.price ?? 0;
            for(const i of items ?? []) {
                price += i.price;
            }
        }

        return price;
    }

    return (
        <Card
            hoverable
        >
            <DisplayPrice price={finalDisksPrice()}/>
        </Card>
    );
}