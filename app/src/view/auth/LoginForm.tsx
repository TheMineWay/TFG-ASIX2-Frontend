import { Form, FormInstance, notification, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import PasswordFormItem from '../form/PasswordFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import UsernameFormItem from '../form/UsernameFormItem';

type Props = {
    form: FormInstance;
}

type LoginResponse = {
    token: string;
    expiresAt: Date;
}

type LoginRequest = {
    login: string;
    password: string;
}

export default function LoginForm(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (data: LoginRequest) => {
        setLoading(true);
        try {
            const result = await request<LoginResponse>('post', '/actions/login', data);
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <>
            <Form
                form={props.form}
                layout='vertical'
                onFinish={submit}
            >
                <UsernameFormItem
                    name='login'
                    required
                    requiredInvisibility
                />
                <PasswordFormItem
                    name='password'
                    required
                    requiredInvisibility
                />

                <Space>
                    <SubmitFormItem
                        text={t('common.actions.Login')}
                        loading={loading}
                    />
                    <ResetFormItem
                        onReset={props.form.resetFields}
                    />
                </Space>
            </Form>
        </>
    );
}
