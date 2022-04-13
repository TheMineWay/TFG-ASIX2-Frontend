import { Col, Row } from "antd";
import useInventory from "../../hooks/inventory/useInventory";
import Loading from "../shared/Loading";

type Props = {
    onFinish: () => void;
}

export default function DiskBuilderTool(props: Props) {

    const inventory = useInventory();

    const loading = inventory.loading;

    if (loading) return <Loading />;

    return (
        <Row
            justify='center'
            gutter={[12,12]}
        >
            <Col span={20}>

            </Col>
        </Row>
    );
}