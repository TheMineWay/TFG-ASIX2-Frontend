import { Card, Col, Row } from 'antd';
import { UseDiskRequestAdmin } from '../../hooks/diskRequest/useDiskRequestAdmin';
import { UseInventory } from '../../hooks/inventory/useInventory';
import Loading from '../shared/Loading';

type Props = {
    diskRequestsAdmin: UseDiskRequestAdmin;
    inventory: UseInventory;
}

export default function AdminDiskRequestsList(props: Props) {

    const { requests } = props.diskRequestsAdmin;

    const isLoading = props.diskRequestsAdmin.loading || props.inventory.loading;

    if (isLoading) return <Loading />;

    return (
        <Row
            gutter={[24, 24]}
        >
            {
                requests.map((request) => {

                    return (
                        <Col
                            xs={24}
                            xl={12}
                        >
                            <Card
                                hoverable
                                title={request.purchase.id}
                            >
                                
                            </Card>
                        </Col>                        
                    )
                })
            }
        </Row>
    );
}