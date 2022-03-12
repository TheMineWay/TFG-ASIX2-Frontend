import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
    showStrenght?: boolean; // TODO: implement
}

export default function PasswordFormItem(props: Props) {
    return (
        <Form.Item label={t('common.form.Password')}>
            <Input.Password prefix={<LockOutlined/>} type='password' name={props.name}/>
        </Form.Item>
    );
}
