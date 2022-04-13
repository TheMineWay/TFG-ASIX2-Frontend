import { Button, Col, Divider, Row } from "antd";
import { t } from "i18next";
import { useState } from "react";
import useCoins from "../../../hooks/coins/useCoins";
import useInventory from "../../../hooks/inventory/useInventory";
import Loading from "../../shared/Loading";
import DiskBuilderTabs from "./DiskBuilderTabs";

export type DiskBuilderFormValues = {
    amount: number;
    items: string[];
    disk: string;
}

type Props = {
    onFinish: () => void;
    disks: { [id: string]: DiskBuilderFormValues };
    setDisks: (disks: { [id: string]: DiskBuilderFormValues }) => void;
}

export const defaultDiskRequest: DiskBuilderFormValues = {
    amount: 1,
    items: [],
    disk: ''
}

export default function DiskBuilderTool(props: Props) {

    const inventory = useInventory();
    const loading = inventory.loading;

    // Disks pagination
    const [diskTab, setDiskTab] = useState<string>('1');
    const disks = props.disks;
    const setDisks = props.setDisks;

    const { DisplayPrice } = useCoins();

    if (loading) return <Loading />;

    const findValidTabId = (): string => {
        for (let i = 1; i > 0; i++) {
            const name = `${t('view.diskRequest.tabs.Tab')} ${i}`;
            if (!Object.keys(disks).includes(i.toString())) {
                return i.toString();
            }
        }
        return "Sth went wrong";
    }

    const finalPrice = (): number => {
        let price = 0;

        for(const disk of Object.entries(disks)) {
            const items = inventory.inventory?.filter((item) => disk[1].items.includes(item.id));
            const diskItem = inventory.inventory?.find((item) => item.id === disk[1].disk);

            price += diskItem?.price ?? 0;
            for(const i of items ?? []) {
                price += i.price;
            }
        }

        return price;
    }

    return (
        <Row
            gutter={[24, 24]}
        >
            <Col span={24}>
                <DiskBuilderTabs
                    current={diskTab}
                    disks={disks}
                    change={setDiskTab}
                    inventory={inventory.inventory ?? []}
                    remove={(id) => {

                        let ds: { [id: string]: DiskBuilderFormValues } = {};

                        for (const dId in disks) {
                            if (dId === id) continue;

                            const disk = disks[dId];
                            ds[dId] = disk;
                        }

                        setDisks(ds);
                    }}
                    add={() => {
                        const dks = disks;
                        const id = findValidTabId();
                        dks[id] = defaultDiskRequest;

                        setDisks({
                            ...dks
                        });
                    }}
                    set={(id, values) => {
                        let ds: { [id: string]: DiskBuilderFormValues } = {};

                        for (const dId in disks) {
                            const disk = dId === id ? values : disks[dId];
                            ds[dId] = disk;
                        }

                        setDisks(ds);
                    }}
                />
            </Col>

            <Divider/>
            <Col
                xs={24}
                md={12}
            >
                <p>{t('view.diskRequest.step.build.messages.FinalPrice')} <DisplayPrice price={finalPrice()}/></p>
            </Col>
            <Col
                xs={24}
                md={12}
                style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Button
                    disabled={Object.keys(disks).length <= 0}
                    type='primary'
                    onClick={() => {
                        props.onFinish();
                    }}
                >{t('view.diskRequest.step.build.actions.FinishBuild')}</Button>
            </Col>
        </Row>
    );
}