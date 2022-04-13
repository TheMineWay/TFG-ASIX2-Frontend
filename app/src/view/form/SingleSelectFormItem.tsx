import { Form, Input, Select } from 'antd';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    icon?: JSX.Element;
    options: {title: JSX.Element, key: string}[];
}

export default function SingleSelectFormItem(props: Props) {
    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <Select
              allowClear
            >
              {
                props.options.map((o) => (
                  <Select.Option
                    key={o.key}
                  >
                    {o.title}
                  </Select.Option>
                ))
              }
            </Select>
        </Form.Item>
    );
}