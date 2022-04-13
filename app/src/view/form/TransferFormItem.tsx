import { Form, List, Transfer } from 'antd';
import { TransferItem } from 'antd/lib/transfer';
import { useState } from 'react';

type Props = {
    name: string;
    datasource: TransferItem[];
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    render?: (item: { title?: string, key?: string, description?: string }) => JSX.Element;
}

export default function TransferFormItem(props: Props) {

    const [selected, setSelected] = useState<string[]>([]);
    const [target, setTarget] = useState<string[]>([]);

    const onSelectChange = (source: string[], target: string[]) => {
        setSelected([...source, ...target]);
    }

    const onChange = (nextTarget: string[]) => {
        setTarget(nextTarget);
    }

    return (
        <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
            <Transfer
                listStyle={{
                    width: '100%',
                    height: '100%'
                }}
                dataSource={props.datasource}
                showSearch
                render={(item) => {

                    if(props.render) return props.render(item);
                    return <>{item.title}</>;
                }}
                selectedKeys={selected}
                onSelectChange={onSelectChange}
                targetKeys={target}
                onChange={onChange}
            />
        </Form.Item>
    );
}