import { Form, Input } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label?: string;
    min?: number;
    max?: number;
    showCount?: boolean;
    placeholder?: string;
}

export default function TextAreaFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required}>
            <Input.TextArea
                placeholder={props.placeholder}
                showCount={props.showCount}
                required={props.required}
                minLength={props.min}
                maxLength={props.max}
            />
        </Form.Item>
    );
}