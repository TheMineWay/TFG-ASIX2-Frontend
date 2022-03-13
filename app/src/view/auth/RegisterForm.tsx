import { Form, FormInstance } from 'antd';
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
    login: string;
}

export default function RegisterForm(props: Props) {

    const submit = (values: SignupRequest) => {

    }

    return (
        <Form>
            
        </Form>
    );
}