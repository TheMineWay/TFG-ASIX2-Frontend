import { Form, Input } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    min?: number;
    max?: number;
    showCount?: boolean;
}

export default function TextAreaFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <Input.TextArea
                showCount={props.showCount}
                required={props.required}
                minLength={props.min}
                maxLength={props.max}
            />
        </Form.Item>
    );
}