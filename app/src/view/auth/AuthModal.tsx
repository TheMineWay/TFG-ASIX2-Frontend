import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Props = {
    visible: 'login' | 'register' | null;
    hide: () => void;
}

export default function LoginModal(props: Props) {

    const [loginForm] = useForm();
    const [registerForm] = useForm();

    function hide() {
        loginForm.resetFields();
        registerForm.resetFields();

        props.hide();
    }

    return (
        <>
            <Modal
                visible={props.visible === 'login'}
                onCancel={hide}
                title={t('view.login.Title')}
                footer={null}
            >
                <LoginForm
                    form={loginForm}
                    hide={hide}
                />
            </Modal>
            <Modal
                visible={props.visible === 'register'}
                onCancel={hide}
                title={t('view.signup.Title')}
                footer={null}
            >
                <RegisterForm
                    form={registerForm}
                    hide={hide}
                />
            </Modal>
        </>
    )
}