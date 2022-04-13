import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { TransferItem } from 'antd/lib/transfer';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import NumberFormItem from '../../form/NumberFormItem';
import TransferFormItem from '../../form/TransferFormItem';
import { DiskBuilderFormValues } from './DiskBuilderTool';

type Props = {
    onSave: (values: DiskBuilderFormValues) => void;
    originalValue: DiskBuilderFormValues;
    inventory: InventoryItem[];
}

export default function DiskBuilderForm(props: Props) {
    
    const [form] = useForm<DiskBuilderFormValues>();

    const datasource: TransferItem[] = props.inventory.map((i) => ({
        title: i.name,
        key: i.id,
        chosen: true
    })) ?? [];

    return (
        <Form
            form={form}
            onFinish={props.onSave}
            initialValues={props.originalValue}
        >
            <NumberFormItem
                name='amount'
                min={1}
                max={32}
                label={'_amount'}
            />
            <TransferFormItem
                name='items'
                label={'_items'}
                datasource={datasource}
            />
        </Form>
    )
}