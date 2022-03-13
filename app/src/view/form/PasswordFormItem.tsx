import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
    showStrenght?: boolean; // TODO: implement
    required?: boolean;
    requiredInvisibility?: boolean;
    label?: string | null;
}

export default function PasswordFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label === null ? undefined : props.label ?? t('common.form.Password')} required={props.required && !props.requiredInvisibility}>
            <Input.Password prefix={<LockOutlined/>} type='password' required={props.required}/>
        </Form.Item>
    );
}
