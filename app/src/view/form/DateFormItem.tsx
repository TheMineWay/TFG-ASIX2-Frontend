import { DatePicker, Form, Input } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
}

export default function DateFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <DatePicker
                style={{width: '100%'}}
            />
        </Form.Item>
    );
}