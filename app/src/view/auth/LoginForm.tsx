import { Form, FormInstance, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import useAuthState from '../../hooks/auth/useAuthState';
import request from '../../services/api/Request';
import { UserModel } from '../../services/auth/User.model';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import PasswordFormItem from '../form/PasswordFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import UsernameFormItem from '../form/UsernameFormItem';

type Props = {
    form: FormInstance;
    hide: () => void;
}

type LoginResponse = {
    token: string;
    expiresAt: string;
    user: {
        name: string;
        lastname: string;
        login: string;
        phone: string;
        isEmailVerified: "1" | "0";
        createdAt: string;
        id: string;
    };
}

type LoginRequest = {
    login: string;
    password: string;
}

export default function LoginForm(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [authState, setAuthState] = useAuthState();

    const submit = async (data: LoginRequest) => {
        setLoading(true);
        try {
            const result = await request<LoginResponse>('post', '/actions/login', data);

            setAuthState({
                credentials: {
                    session: result.token,
                    expiresAt: new Date(Date.parse(result.expiresAt)),
                },
                user: {
                    ...result.user,
                    createdAt: new Date(Date.parse(result.user.createdAt)),
                    isEmailVerified: result.user.isEmailVerified === '1',
                },
            });
            props.hide();
        } catch (e: any) {
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
