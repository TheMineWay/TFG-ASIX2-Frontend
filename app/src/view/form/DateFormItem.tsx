import { DatePicker, Form, Input } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    min?: Date;
    max?: Date;
}

export default function DateFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required}>
            <DatePicker
                style={{width: '100%'}}
                disabledDate={(d) => !d || (!!props.min && d.isBefore(props.min)) || (!!props.max && d.isAfter(props.max))}
            />
        </Form.Item>
    );
}