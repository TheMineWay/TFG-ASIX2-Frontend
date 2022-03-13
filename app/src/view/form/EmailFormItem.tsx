import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { isEmail } from 'class-validator';
import { t } from 'i18next';
import { useState } from 'react';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
}

export default function EmailFormItem(props: Props) {
    const [ value, setValue ] = useState<string>('');

    const isValid: boolean = isEmail(value);

    return (
        <Form.Item
            name={props.name}
            label={t('common.form.Email')}
            required={props.required && !props.requiredInvisibility}
            validateStatus={value ? (isValid ? 'success' : 'error') : 'validating'}
        >
            <Input
                prefix={<MailOutlined/>}
                type='email'
                required={props.required}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Form.Item>
    );
}