import { Col, Form, FormInstance, Row } from 'antd';
import { t } from 'i18next';
import EmailFormItem from '../form/EmailFormItem';
import PasswordFormItem from '../form/PasswordFormItem';
import PhoneFormItem from '../form/PhoneFormItem';
import TextFormItem from '../form/TextFormItem';
import UsernameFormItem from '../form/UsernameFormItem';

type Props = {
    form: FormInstance;
    hide: () => void;
}

type SignupRequest = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
    login: string;
}

export default function RegisterForm(props: Props) {

    const submit = (values: SignupRequest) => {

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
                        name='name'
                        label={t('common.form.Name')}
                        required requiredInvisibility
                    />
                </Col>
                <Col span={12}>
                    <TextFormItem
                        name='lastName'
                        label={t('common.form.LastName')}
                        required requiredInvisibility
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
        </Form>
    );
}