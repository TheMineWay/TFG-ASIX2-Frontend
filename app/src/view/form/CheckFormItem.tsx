import { Checkbox, Form } from 'antd';

type Props = {
    name: string;
    text: string | JSX.Element;
}

export default function CheckFormItem(props: Props) {
    return (
        <Form.Item
            name={props.name}
            valuePropName="checked"
        >
            <Checkbox>{props.text}</Checkbox>
        </Form.Item>
    );
}