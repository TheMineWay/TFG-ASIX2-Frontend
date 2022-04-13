import { TransferItem } from "antd/lib/transfer";
import { t } from "i18next";
import { useState } from "react";
import useInventory from "../../../hooks/inventory/useInventory";
import Loading from "../../shared/Loading";
import DiskBuilderTabs from "./DiskBuilderTabs";

export type DiskBuilderFormValues = {
    amount: number;
}

type Props = {
    onFinish: () => void;
}

const defaultDisk: DiskBuilderFormValues = {
    amount: 1,
}

export default function DiskBuilderTool(props: Props) {

    const inventory = useInventory();
    const loading = inventory.loading;

    // Disks pagination
    const [diskTab, setDiskTab] = useState<string>('1');
    const [disks, setDisks] = useState<{ [id: string]: DiskBuilderFormValues }>({
        '0': defaultDisk,
    });

    if (loading) return <Loading />;

    const findValidTabId = (): string => {
        for(let i = 1; i > 0; i++) {
            const name = `${t('view.diskRequest.tabs.Tab')} ${i}`;
            if(!Object.keys(disks).includes(i.toString())) {
                return i.toString();
            }
        }
        return "Sth went wrong";
    }

    return (
        <>
            <DiskBuilderTabs
                current={diskTab}
                disks={disks}
                change={setDiskTab}
                inventory={inventory.inventory ?? []}
                remove={(id) => {
                    
                    let ds: {[id: string]: DiskBuilderFormValues} = {};

                    for(const dId in disks) {
                        if(dId === id) continue;

                        const disk = disks[dId];
                        ds[dId] = disk;
                    }

                    setDisks(ds);
                }}
                add={() => {
                    const dks = disks;
                    const id = findValidTabId();
                    dks[id] = defaultDisk;

                    setDisks({
                        ...dks
                    });
                }}
            />
        </>
    );
}