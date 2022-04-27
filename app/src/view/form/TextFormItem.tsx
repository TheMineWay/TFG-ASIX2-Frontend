import { Form, Input } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    icon?: JSX.Element;
    min?: number;
    max?: number;
    showCount?: boolean;
    pattern?: string;
}

export default function TextFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <Input
                showCount={props.showCount}
                prefix={props.icon}
                type='text'
                required={props.required}
                minLength={props.min}
                maxLength={props.max}
                pattern={props.pattern}
            />
        </Form.Item>
    );
}