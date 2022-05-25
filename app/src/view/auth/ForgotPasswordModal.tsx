import { Button, Form, Modal, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import EmailFormItem from '../form/EmailFormItem';
import SubmitFormItem from '../form/SubmitFormItem';

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function ForgotPasswordModal(props: Props) {

    const [form] = useForm<{ email: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        form.resetFields();
    }, []);

    const submit = async (values: { email: string }) => {
        setLoading(true);
        try {

        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
            footer={null}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={submit}
            >
                <EmailFormItem
                    name={t('common.form.Email')}
                    required
                />
                <p
                    style={{
                        textAlign: 'justify',
                    }}
                >
                    {t('common.other.ForgotPasswordInfo')}
                </p>
                <Space>
                    <SubmitFormItem
                        text={t('common.actions.Recover')}
                        loading={loading}
                    />
                </Space>
            </Form>
        </Modal>
    );
}