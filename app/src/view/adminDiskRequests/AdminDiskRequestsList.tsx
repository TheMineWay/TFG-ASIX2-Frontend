import { Card, Col, Row, Select, Space, Switch, Tree } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { FullDiskRequestPurchase } from '../../hooks/diskRequest/useDetailedDiskRequest';
import { UseDiskRequestAdmin } from '../../hooks/diskRequest/useDiskRequestAdmin';
import { DiskRequestState } from '../../hooks/diskRequest/useDiskRequestList';
import { UseInventory } from '../../hooks/inventory/useInventory';
import useUsers from '../../hooks/user/useUsers';
import Loading from '../shared/Loading';
import UserDisplay from '../shared/UserDisplay';

type Props = {
    diskRequestsAdmin: UseDiskRequestAdmin;
    inventory: UseInventory;
}

export default function AdminDiskRequestsList(props: Props) {

    const users = useUsers();
    const { resolveInventoryItemById } = props.inventory;
    const { requests, setPurchaseState, isLoading } = props.diskRequestsAdmin;

    const [stateFilters, setStateFilters] = useState<DiskRequestState[]>(['pending', 'processing', 'sent']);

    if (props.diskRequestsAdmin.loading || props.inventory.loading) return <Loading />;

    const SetStateDropdown = (dropProps: { request: FullDiskRequestPurchase }) => (
        <Select<DiskRequestState>
            defaultValue={dropProps.request.purchase.state}
            style={{
                width: '100%',
            }}
            onChange={async (v) => {
                setPurchaseState(dropProps.request.purchase.id, v);
            }}
            loading={isLoading(dropProps.request.purchase.id)}
            disabled={isLoading(dropProps.request.purchase.id)}
        >
            <Select.Option key='delivered'>{t('view.diskRequestAdmin.item.states.Delivered')}</Select.Option>
            <Select.Option key='sent'>{t('view.diskRequestAdmin.item.states.Sent')}</Select.Option>
            <Select.Option key='processing'>{t('view.diskRequestAdmin.item.states.Processing')}</Select.Option>
            <Select.Option key='pending'>{t('view.diskRequestAdmin.item.states.Pending')}</Select.Option>
        </Select>
    );

    const StateSwitchFilter = (switchProps: { state: DiskRequestState }) => (
        <Switch
            checked={stateFilters.includes(switchProps.state)}
            onChange={(v) => {
                if(v && !stateFilters.includes(switchProps.state)) {
                    setStateFilters([
                        ...stateFilters,
                        switchProps.state,
                    ]);
                } else if (true) {
                    if(!v && stateFilters.includes(switchProps.state)) {
                        const list = stateFilters;
                        delete list[list.findIndex((i) => i === switchProps.state)];

                        setStateFilters([
                            ...list ?? stateFilters
                        ]);
                    }
                }
            }}
        />
    )

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Card>
                    <Row gutter={[6, 6]}>
                        {
                            (['sent', 'delivered', 'processing', 'pending'] as DiskRequestState[]).map((state) => (
                                <Col>
                                    <Space>
                                        {t(`view.diskRequestAdmin.filters.${state[0].toUpperCase() + state.slice(1)}`)}
                                        <StateSwitchFilter state={state} />
                                    </Space>
                                </Col>
                            ))
                        }
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Row
                    gutter={[24, 24]}
                >
                    {
                        requests
                            .filter((v) => stateFilters.includes(v.purchase.state))
                            .map((request) => {

                                return (
                                    <Col
                                        xs={24}
                                        lg={12}
                                        xxl={6}
                                    >
                                        <Card
                                            hoverable
                                            title={
                                                <Row
                                                    gutter={[6, 6]}
                                                    justify='space-between'
                                                >
                                                    <Col span={12}>
                                                        <UserDisplay id={request.purchase.user} users={users} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <SetStateDropdown request={request} />
                                                    </Col>
                                                </Row>
                                            }
                                        >
                                            <Row gutter={[12, 12]}>
                                                <Col span={24}>
                                                    <Tree
                                                        treeData={request.builds.map((build, bIndex) => {

                                                            const disk = resolveInventoryItemById(build.build.disk);

                                                            return {
                                                                title: <>{(typeof (disk) === 'string' ? disk : disk.name)} <b>x {build.build.amount}</b></>,
                                                                key: `BI_${bIndex}`,
                                                                children: build.items.map(resolveInventoryItemById).map((item, iIndex) => {
                                                                    return {
                                                                        title: typeof (item) === 'string' ? item : item.name,
                                                                        key: `BI_${bIndex}_${iIndex}`,
                                                                    };
                                                                })
                                                            };
                                                        })}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                )
                            })
                    }
                </Row>
            </Col>
        </Row>
    );
}