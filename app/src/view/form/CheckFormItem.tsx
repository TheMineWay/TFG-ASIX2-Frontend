import { Checkbox, Form } from 'antd';

type Props = {
    name: string;
    text: string;
}

export default function CheckFormItem(props: Props) {
    return (
        <Form.Item
            name={props.name}
        >
            <Checkbox>{props.text}</Checkbox>
        </Form.Item>
    );
}