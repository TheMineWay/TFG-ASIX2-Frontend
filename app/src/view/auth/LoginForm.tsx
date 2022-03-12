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

export default function LoginForm(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    const submit = async () => {
        setLoading(true);
        try {
            const result = await request<LoginResponse>('post', '/actions/login');
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
            >
                <UsernameFormItem
                    name='login'
                />
                <PasswordFormItem
                    name='password'
                />

                <Space>
                    <SubmitFormItem
                        text={t('common.actions.Login')}
                        submit={submit}
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
