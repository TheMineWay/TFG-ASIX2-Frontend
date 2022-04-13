import { Col, Row } from "antd";
import { useState } from "react";
import Container from "../shared/Container";
import DiskBuilderTool from "./DiskBuilder/DiskBuilderTool";
import DiskRequestSteps from "./DiskRequestSteps";

export default function DiskRequestViewPage() {

    const [step, setStep] = useState<number>(0);

    const next = () => {
        if (step >= 3) return;
        setStep(step + 1);
    }

    const back = () => {
        if (step <= 0) return;
        setStep(step - 1);
    }

    const steps: {
        step: number;
        component: JSX.Element;
    }[] = [
            {
                step: 0,
                component: (
                    <DiskBuilderTool
                        onFinish={() => {
                            next();
                        }}
                    />
                )
            }
        ];

    return (
        <Container>
            <Row>
                <Col
                    span={24}
                >
                    <DiskRequestSteps
                        step={step}
                    />
                </Col>
                <Col span={24}>
                    {
                        steps.find((s) => s.step === step)?.component
                    }
                </Col>
            </Row>
        </Container>
    );
}