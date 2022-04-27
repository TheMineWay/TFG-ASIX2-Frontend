import { BuildOutlined, CheckOutlined, PayCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Divider, Steps } from 'antd';
import { t } from 'i18next';

const { Step } = Steps;

type Props = {
    step: number;
    setStep: (step: number) => void;
    disabledNavigation: boolean;
};

export default function DiskRequestSteps(props: Props) {

    const getState = (step: number): 'finish' | 'process' | 'wait' => {
        if (step === props.step) return 'process';
        if (step < props.step) return 'finish';

        return 'wait';
    }

    function setStep(step: number) {
        if(!props.disabledNavigation) {
            if(props.step >= step) {
                props.setStep(step);
            }
        }
    }

    return (
        <>
            <Steps
                style={{ width: '100%' }}
            >
                <Step
                    status={getState(0)}
                    title={t('view.diskRequest.steps.build')}
                    icon={<BuildOutlined />}
                    onClick={() => {
                        setStep(0);
                    }}
                />
                <Step
                    status={getState(1)}
                    title={t('view.diskRequest.steps.send')}
                    icon={<SendOutlined />}
                    onClick={() => {
                        setStep(1);
                    }}
                />
                <Step
                    status={getState(2)}
                    title={t('view.diskRequest.steps.payment')}
                    icon={<PayCircleOutlined />}
                    onClick={() => {
                        setStep(2);
                    }}
                />
                <Step
                    status={getState(3)}
                    title={t('view.diskRequest.steps.sent')}
                    icon={<CheckOutlined />}
                />
            </Steps>
            <Divider />
        </>
    );
}