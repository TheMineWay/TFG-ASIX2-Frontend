import { Col, Row } from "antd";
import { useState } from "react";
import useInventory from "../../hooks/inventory/useInventory";
import Loading from "../shared/Loading";
import DiskRequestSteps from "./DiskRequestSteps";

export default function DiskBuilderTool() {

    const inventory = useInventory();
    const [step, setStep] = useState<number>(0);

    const loading = inventory.loading;

    if (loading) return <Loading />;

    return (
        <Row
            justify='center'
            gutter={[12,12]}
        >
            <Col span={20}>
                <DiskRequestSteps
                    step={step}
                />
            </Col>
        </Row>
    );
}