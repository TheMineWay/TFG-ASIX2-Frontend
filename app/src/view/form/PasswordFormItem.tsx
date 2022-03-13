import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import PasswordStrengthIndicator from '../shared/PasswordStrengthIndicator';

type Props = {
    name: string;
    showStrenght?: boolean;
    required?: boolean;
    requiredInvisibility?: boolean;
    label?: string | null;
}

export default function PasswordFormItem(props: Props) {
    const [password, setPassword] = useState<string>('');

    return (
        <Form.Item
            name={props.name}
            label={props.label === null ? undefined : props.label ?? t('common.form.Password')}
            required={props.required && !props.requiredInvisibility}
        >
            <Input.Password
                prefix={<LockOutlined/>}
                type='password'
                required={props.required}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {
                props.showStrenght && <PasswordStrengthIndicator password={password}/>
            }
        </Form.Item>
    );
}
