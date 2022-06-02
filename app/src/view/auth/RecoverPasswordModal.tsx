import { Button, Form, Modal, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import EmailFormItem from '../form/EmailFormItem';
import PasswordFormItem from '../form/PasswordFormItem';
import SubmitFormItem from '../form/SubmitFormItem';

type Props = {
    token?: string;
}

export default function RecoverPasswordModal(props: Props) {

    const [form] = useForm<{ password: string, passwordAgain: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        form.resetFields();
    }, []);

    const submit = async (values: { password: string, passwordAgain: string }) => {
        setLoading(true);
        try {
            if (values.password !== values.passwordAgain) {
                throw {
                    code: 'passwords-no-match',
                    section: 'form',
                };
            }
            const result = await request<{}>('post', '/actions/auth/postRecoverPassword', { password: values.password, token: props.token! });
            hide();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    const hide = () => {
        navigate('/');
    }

    return (
        <Modal
            visible={props.token !== undefined}
            footer={null}
            closable={false}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={submit}
            >
                <PasswordFormItem
                    name='password'
                    showStrenght
                />
                <PasswordFormItem
                    name='passwordAgain'
                    label={t('common.form.RepeatPassword')}
                />
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