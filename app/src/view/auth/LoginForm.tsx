import { Button, Form, FormInstance, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import useAuthState from '../../hooks/auth/useAuthState';
import AuthService from '../../services/auth/AuthService';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import CheckFormItem from '../form/CheckFormItem';
import PasswordFormItem from '../form/PasswordFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import UsernameFormItem from '../form/UsernameFormItem';
import ForgotPasswordModal from './ForgotPasswordModal';

type Props = {
    form: FormInstance;
    hide: () => void;
}

export type LoginRequest = {
    login: string;
    password: string;
    remember: boolean;
}

export default function LoginForm(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [authState, setAuthState] = useAuthState();

    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);

    const [cookies, setCookie] = useCookies();

    const submit = async (data: LoginRequest) => {
        setLoading(true);
        try {
            const result = await AuthService.login(data);

            setAuthState({
                session: result.token,
                expiresAt: result.expiresAt,
            });

            if (data.remember) {
                setCookie('authCredentials', { session: result.token, expiresAt: result.expiresAt }, { expires: result.expiresAt });
            }

            props.hide();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    const forgotPassword = () => {
        props.hide();
        setForgotPasswordModal(true);
    }

    return (
        <>
            <ForgotPasswordModal
                visible={forgotPasswordModal}
                hide={() => setForgotPasswordModal(false)}
            />
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
                <CheckFormItem
                    name='remember'
                    text={t('common.form.RememberMe')}
                />

                <Space>
                    <SubmitFormItem
                        text={t('common.actions.Login')}
                        loading={loading}
                    />
                    <ResetFormItem />
                    <Button
                        type='link'
                        onClick={forgotPassword}
                    >
                        {t('common.other.ForgotPassword')}
                    </Button>
                </Space>
            </Form>
        </>
    );
}
