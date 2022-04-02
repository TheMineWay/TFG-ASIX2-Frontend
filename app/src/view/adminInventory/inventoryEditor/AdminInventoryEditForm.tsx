import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import NumberFormItem from '../../form/NumberFormItem';
import TextAreaFormItem from '../../form/TextAreaFormItem';
import TextFormItem from '../../form/TextFormItem';

type Props = {
    item: InventoryItem;
}

export default function AdminInventoryEditForm(props: Props) {

    const item = props.item;
    const [form] = useForm<InventoryItem>();

    return (
        <Form
            form={form}
            initialValues={item}
            layout='vertical'
        >
            <TextFormItem
                name='name'
                label={t('view.inventory.list.headers.Name')}
                min={2}
                max={32}
            />
            <TextAreaFormItem
                showCount
                name='description'
                label={t('view.inventory.list.headers.Description')}
                min={2}
                max={128}
            />
            <NumberFormItem
                name='price'
                label={t('view.inventory.list.headers.Price') + " (€)"}
                min={0}
            />
        </Form>
    );
}