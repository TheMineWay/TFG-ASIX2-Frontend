import { PhoneOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
}

export default function PhoneFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={t('common.form.Phone')} required={props.required && !props.requiredInvisibility}>
            <Input prefix={<PhoneOutlined/>} type='text' required={props.required} />
        </Form.Item>
    );
}