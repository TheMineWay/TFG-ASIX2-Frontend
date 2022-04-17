import { Form, Select } from 'antd';
import { useState } from 'react';
import { decomposeString } from '../../services/filters/genericFilter';

type Opt = { title: JSX.Element, key: string };

type Props = {
  name: string;
  required?: boolean;
  requiredInvisibility?: boolean;
  label: string;
  icon?: JSX.Element;
  options: Opt[];
  onSelect?: (key: string) => void;
  showSearch?: boolean;
  disabled?: boolean;
}

export default function SingleSelectFormItem(props: Props) {

  const [filter, setFilter] = useState<string>('');

  const filteredOptions: Opt[] = props.options.filter((opt) => decomposeString(opt.key).includes(filter));

  const onSearch = (value: string) => {
    setFilter(decomposeString(value) ?? '');
  }

  return (
    <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
      <Select
        disabled={props.disabled}
        showSearch={props.showSearch}
        allowClear
        onChange={props.onSelect}
        onSearch={onSearch}
      >
        {
          filteredOptions.map((o) => (
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