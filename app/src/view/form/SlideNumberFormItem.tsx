import { Form, InputNumber, Slider } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    min?: number;
    max?: number;
}

export default function SlideNumberFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <Slider
                style={{width: '100%'}}
                min={props.min ?? 0}
                max={props.max ?? 100}
            />
        </Form.Item>
    );
}