import { Button, Col, Row } from "antd";
import { t } from "i18next";
import { useState } from "react";
import useInventory from "../../../hooks/inventory/useInventory";
import Loading from "../../shared/Loading";
import DiskBuilderTabs from "./DiskBuilderTabs";

export type DiskBuilderFormValues = {
    amount: number;
    items: string[];
}

type Props = {
    onFinish: () => void;
    disks: { [id: string]: DiskBuilderFormValues };
    setDisks: (disks: { [id: string]: DiskBuilderFormValues }) => void;
}

export const defaultDiskRequest: DiskBuilderFormValues = {
    amount: 1,
    items: [],
}

export default function DiskBuilderTool(props: Props) {

    const inventory = useInventory();
    const loading = inventory.loading;

    // Disks pagination
    const [diskTab, setDiskTab] = useState<string>('1');
    const disks = props.disks;
    const setDisks = props.setDisks;

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

            <Col
                span={24}
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