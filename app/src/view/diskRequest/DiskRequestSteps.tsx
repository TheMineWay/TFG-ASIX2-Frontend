import { BuildOutlined, CheckOutlined, PayCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { t } from 'i18next';

const { Step } = Steps;

export type DiskRequestStepsType = 'build' | 'send' | 'pay' | 'sent';

type Props = {
    step: DiskRequestStepsType;
};

export default function DiskRequestSteps(props: Props) {
    return (
        <Steps
            style={{ width: '100%' }}
        >
            <Step
                status={['build', 'send', 'pay', 'sent'].includes(props.step) ? 'process' : 'wait'}
                title={t('view.diskRequest.steps.build')}
                icon={<BuildOutlined />}
            />
            <Step
                status={['send', 'pay', 'sent'].includes(props.step) ? 'process' : 'wait'}
                title={t('view.diskRequest.steps.send')}
                icon={<SendOutlined />}
            />
            <Step
                status={['pay', 'sent'].includes(props.step) ? 'process' : 'wait'}
                title={t('view.diskRequest.steps.payment')}
                icon={<PayCircleOutlined />}
            />
            <Step
                status={['sent'].includes(props.step) ? 'process' : 'wait'}
                title={t('view.diskRequest.steps.sent')}
                icon={<CheckOutlined />}
            />
        </Steps>
    );
}