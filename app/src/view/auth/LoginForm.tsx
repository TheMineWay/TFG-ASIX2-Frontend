import { Form, FormInstance, Space } from 'antd';
import { t } from 'i18next';
import PasswordFormItem from '../form/PasswordFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import UsernameFormItem from '../form/UsernameFormItem';

type Props = {
    form: FormInstance;
}

export default function LoginForm(props: Props) {

    const submit = () => {
        
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
                    />
                    <ResetFormItem
                        onReset={props.form.resetFields}
                    />
                </Space>
            </Form>
        </>
    );
}
