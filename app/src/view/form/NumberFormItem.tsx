import { Form, InputNumber } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    icon?: JSX.Element;
    min?: number;
    max?: number;
}

export default function NumberFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required}>
            <InputNumber
                style={{width: '100%'}}
                prefix={props.icon}
                required={props.required}
                min={props.min}
                max={props.max}
            />
        </Form.Item>
    );
}