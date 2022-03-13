import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
}

export default function EmailFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={t('common.form.Email')} required={props.required && !props.requiredInvisibility}>
            <Input prefix={<MailOutlined/>} type='email' required={props.required}/>
        </Form.Item>
    );
}