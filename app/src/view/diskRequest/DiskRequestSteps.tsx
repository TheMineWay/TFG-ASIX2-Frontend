import { BuildOutlined, CheckOutlined, PayCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { t } from 'i18next';

const { Step } = Steps;

type Props = {
    step: number;
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
            />
            <Step
                status={getState(1)}
                title={t('view.diskRequest.steps.send')}
                icon={<SendOutlined />}
            />
            <Step
                status={getState(2)}
                title={t('view.diskRequest.steps.payment')}
                icon={<PayCircleOutlined />}
            />
            <Step
                status={getState(3)}
                title={t('view.diskRequest.steps.sent')}
                icon={<CheckOutlined />}
            />
        </Steps>
    );
}