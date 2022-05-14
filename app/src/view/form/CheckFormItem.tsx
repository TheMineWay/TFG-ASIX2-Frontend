import { Checkbox, Form } from 'antd';

type Props = {
    name: string;
    text: string | JSX.Element;
    required?: boolean;
}

export default function CheckFormItem(props: Props) {
    return (
        <Form.Item
            name={props.name}
            valuePropName="checked"
            required={props.required}
        >
            <Checkbox>{props.text}</Checkbox>
        </Form.Item>
    );
}