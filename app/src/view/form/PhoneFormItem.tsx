import { PhoneOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { isPhoneNumber } from 'class-validator';
import { t } from 'i18next';
import { useState } from 'react';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
}

export default function PhoneFormItem(props: Props) {

    const [value, setValue] = useState<string>('');

    const isValid: boolean = isPhoneNumber(value);

    return (
        <Form.Item
            name={props.name}
            label={t('common.form.Phone')}
            requiredMark={!props.requiredInvisibility}
            required={props.required}
            validateStatus={value ? (isValid ? 'success' : 'error') : 'validating'}
        >
            <Input
                value={value}
                onChange={((e) => setValue(e.target.value))}
                prefix={<PhoneOutlined />}
                type='text'
                required={props.required}
                placeholder='+34 555 55 55'
                maxLength={12}
            />
        </Form.Item>
    );
}