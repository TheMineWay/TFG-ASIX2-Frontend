import { BuildOutlined, CheckOutlined, PayCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { t } from 'i18next';

const { Step } = Steps;

type Props = {
    step: number;
    setStep: (step: number) => void;
};

export default function DiskRequestSteps(props: Props) {

    const getState = (step: number): 'finish' | 'process' | 'wait' => {
        if(step === props.step) return 'process';
        if(step < props.step) return 'finish';
        
        return 'wait';
    }

    return (
        <Steps
            style={{ width: '100%' }}
        >
            <Step
                status={getState(0)}
                title={t('view.diskRequest.steps.build')}
                icon={<BuildOutlined />}
                onClick={() => {
                    props.setStep(0);
                }}
            />
            <Step
                status={getState(1)}
                title={t('view.diskRequest.steps.send')}
                icon={<SendOutlined />}
                onClick={() => {
                    if(props.step >= 1) props.setStep(1);
                }}
            />
            <Step
                status={getState(2)}
                title={t('view.diskRequest.steps.payment')}
                icon={<PayCircleOutlined />}
                onClick={() => {
                    if(props.step >= 2) props.setStep(2);
                }}
            />
            <Step
                status={getState(3)}
                title={t('view.diskRequest.steps.sent')}
                icon={<CheckOutlined />}
            />
        </Steps>
    );
}