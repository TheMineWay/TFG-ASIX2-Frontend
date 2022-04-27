import { Col, Row } from "antd";
import { useState } from "react";
import useDiskRequest from "../../hooks/diskRequest/useDiskRequest";
import useInventory from "../../hooks/inventory/useInventory";
import Container from "../shared/Container";
import Loading from "../shared/Loading";
import DiskBuilderTool, { defaultDiskRequest, DiskBuilderFormValues } from "./DiskBuilder/DiskBuilderTool";
import DiskBuilderPay, { DiskBuilderPayFormValues } from "./DiskPay/DiskBuilderPay";
import DiskRequestSteps from "./DiskRequestSteps";
import DiskRequestSummary from "./DiskRequestSummary";
import DiskBuilderSend, { DiskSendOption } from "./DiskSend/DiskBuilderSend";
import DiskRequestFinish from "./finish/DiskRequestFinish";

export default function DiskRequestViewPage() {

    const inventory = useInventory();

    // Step 1 - DISKS
    const [disks, setDisks] = useState<{ [id: string]: DiskBuilderFormValues }>({'1': defaultDiskRequest});

    // Step 2 - SEND
    const [send, setSend] = useState<DiskSendOption>();

    // Step 3 - PAY
    const [pay, setPay] = useState<DiskBuilderPayFormValues>();

    // Requester

    const diskRequest = useDiskRequest({
        disks,
        send,
        pay,
    });

    const loading = inventory.loading;

    const [step, setStep] = useState<number>(0);

    
    const next = () => {
        if(diskRequest.loading) return;
        if (step >= 3) return;
        setStep(step + 1);
    }

    const back = () => {
        if(diskRequest.loading) return;
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
                        inventory={inventory.inventory ?? []}
                    />
                )
            },
            {
                step: 1,
                component: (
                    <DiskBuilderSend
                        inventory={inventory.inventory ?? []}
                        onFinish={() => {
                            next();
                        }}
                        setSend={setSend}
                        initial={send}
                    />
                )
            },
            {
                step: 2,
                component: (
                    <DiskBuilderPay
                        onFinish={() => {
                            next();
                        }}
                        setPay={setPay}
                        initial={pay}
                    />
                )
            },
            {
                step: 3,
                component: (
                    <DiskRequestFinish
                        diskRequest={diskRequest}
                    />
                )
            }
        ];

    if(loading) return <Loading/>;
        
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
                <Col
                    xs={24}
                    xl={16}
                >
                    {
                        steps.find((s) => s.step === step)?.component
                    }
                </Col>
                <Col
                    xs={24}
                    xl={8}
                >
                    <DiskRequestSummary
                        inventory={inventory.inventory ?? []}
                        request={diskRequest.requestObj}
                    />
                </Col>
            </Row>
        </Container>
    );
}