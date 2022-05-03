import { Card, Col, Row, Select, Tree } from 'antd';
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
    const { requests } = props.diskRequestsAdmin;

    const [stateFilters, setStateFilters] = useState<DiskRequestState[]>(['pending', 'processing', 'sent']);

    const isLoading = props.diskRequestsAdmin.loading || props.inventory.loading;

    if (isLoading) return <Loading />;

    const SetStateDropdown = (dropProps: { request: FullDiskRequestPurchase }) => (
        <Select
            defaultValue='sent'
            style={{
                width: '100%',
            }}
        >
            <Select.Option key='delivered'>{t('view.diskRequestAdmin.item.states.Delivered')}</Select.Option>
            <Select.Option key='sent'>{t('view.diskRequestAdmin.item.states.Sent')}</Select.Option>
            <Select.Option key='processing'>{t('view.diskRequestAdmin.item.states.Processing')}</Select.Option>
            <Select.Option key='pending'>{t('view.diskRequestAdmin.item.states.Pending')}</Select.Option>
        </Select>
    );

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Card>
                    
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