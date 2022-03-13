import { Form, FormInstance } from 'antd';
import { t } from 'i18next';
import PasswordFormItem from '../form/PasswordFormItem';

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
            <PasswordFormItem
                name='password'
                showStrenght
                label={t('common.form.RepeatPassword')}
            />
            <PasswordFormItem
                name='repeatPassword'
            />
        </Form>
    );
}