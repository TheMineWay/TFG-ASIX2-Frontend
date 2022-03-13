import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    hidePlaceholder?: boolean;
}

export default function UsernameFormItem(props: Props) {
    const placeholderUsernames: string[] = ['john', 'toni'];

    return (
        <Form.Item name={props.name} label={t('common.form.Username')} required={props.required && !props.requiredInvisibility}>
            <Input prefix={<UserOutlined/>} type='text' placeholder={props.hidePlaceholder ? undefined : placeholderUsernames[Math.floor(Math.random() * placeholderUsernames.length)]} required={props.required}/>
        </Form.Item>
    );
}