import { IdcardOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthState from '../../hooks/auth/useAuthState';
import AuthService from '../../services/auth/AuthService';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import CheckFormItem from '../form/CheckFormItem';
import EmailFormItem from '../form/EmailFormItem';
import PasswordFormItem from '../form/PasswordFormItem';
import PhoneFormItem from '../form/PhoneFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import TextFormItem from '../form/TextFormItem';
import UsernameFormItem from '../form/UsernameFormItem';

type Props = {
    form: FormInstance;
    hide: () => void;
}

export type SignupRequest = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
    login: string;
    policy: boolean;
}

export default function RegisterForm(props: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuthState] = useAuthState();

    const submit = async (values: SignupRequest) => {
        setLoading(true);
        try {
            if(!values.policy) {
                throw {
                    code: 'must-accept-policy',
                    section: 'form',
                };
            }

            if(values.password !== values.repeatPassword) {
                throw {
                    code: 'passwords-no-match',
                    section: 'form',
                };
            }
            
            const result = await AuthService.signup(values);

            setAuthState({
                expiresAt: result.expiresAt,
                session: result.token,
            });

            props.hide();
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Form
            form={props.form}
            layout='vertical'
            onFinish={submit}
        >
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <TextFormItem
                        icon={<IdcardOutlined />}
                        name='name'
                        label={t('common.form.Name')}
                        required requiredInvisibility
                        min={1}
                        max={32}
                    />
                </Col>
                <Col span={12}>
                    <TextFormItem
                        icon={<IdcardOutlined />}
                        name='lastName'
                        label={t('common.form.LastName')}
                        required requiredInvisibility
                        min={1}
                        max={32}
                    />
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <EmailFormItem
                        name='email'
                        required requiredInvisibility
                    />
                </Col>
                <Col span={12}>
                    <PhoneFormItem
                        name='phone'
                        required requiredInvisibility
                    />
                </Col>
            </Row>
            <UsernameFormItem
                name='login'
                required requiredInvisibility
                hidePlaceholder
            />
            <PasswordFormItem
                name='password'
                showStrenght
                required requiredInvisibility
            />
            <PasswordFormItem
                name='repeatPassword'
                label={t('common.form.RepeatPassword')}
                required requiredInvisibility
            />
            <CheckFormItem
                name='policy'
                text={<small>{t('view.signup.AcceptPP')} <Link to="/privacy" target='_blank'>{t('common.other.privacyPolicy')}</Link>.</small>}
            />
            <Space>
                <SubmitFormItem
                    text={t('common.actions.Signup')}
                    loading={loading}
                />
                <ResetFormItem/>
            </Space>
        </Form>
    );
}