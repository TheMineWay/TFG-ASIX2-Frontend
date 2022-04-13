import { Button, Col, Row } from "antd";
import { useState } from "react";
import useDiskRequest from "../../hooks/diskRequest/useDiskRequest";
import Container from "../shared/Container";
import DiskBuilderTool, { defaultDiskRequest, DiskBuilderFormValues } from "./DiskBuilder/DiskBuilderTool";
import DiskRequestSteps from "./DiskRequestSteps";

export default function DiskRequestViewPage() {

    // Step 1 - DISKS
    const [disks, setDisks] = useState<{ [id: string]: DiskBuilderFormValues }>({'1': defaultDiskRequest});

    // Requester
    const { request, loading } = useDiskRequest();

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
                        disks={disks}
                        setDisks={setDisks}
                    />
                )
            },
            {
                step: 1,
                component: (
                    <>

                    </>
                )
            },
            {
                step: 2,
                component: (
                    <>
                        
                    </>
                )
            },
            {
                step: 3,
                component: (
                    <>
                        
                    </>
                )
            }
        ];

    return (
        <Container>
            <Row
                gutter={[24, 24]}
            >
                <Col
                    span={24}
                >
                    <DiskRequestSteps
                        step={step}
                        setStep={setStep}
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