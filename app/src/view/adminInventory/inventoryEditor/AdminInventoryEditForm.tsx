import { SaveOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { AdminInventory } from '../../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import DrawerFormActions from '../../form/DrawerFormActions';
import NumberFormItem from '../../form/NumberFormItem';
import SlideNumberFormItem from '../../form/SlideNumberFormItem';
import SubmitFormItem from '../../form/SubmitFormItem';
import TextAreaFormItem from '../../form/TextAreaFormItem';
import TextFormItem from '../../form/TextFormItem';

type Props = {
    item: InventoryItem;
    adminInventory: AdminInventory;
}

export default function AdminInventoryEditForm(props: Props) {

    const item = props.item;
    const [form] = useForm<InventoryItem>();

    const submit = async (values: InventoryItem) => {
        await props.adminInventory.editItem(props.item.id, values);
    }

    return (
        <Form
            form={form}
            initialValues={item}
            layout='vertical'
            onFinish={submit}
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
                max={255}
            />
            <NumberFormItem
                name='price'
                label={t('view.inventory.list.headers.Price') + " (€)"}
                min={0}
            />
            <SlideNumberFormItem
                name='discount'
                label={t('view.inventory.list.headers.Discount') + " (%)"}
            />
            <NumberFormItem
                name='stock'
                label={t('view.inventory.list.headers.Stock')}
                min={0}
            />

            <DrawerFormActions
                submit={<SubmitFormItem
                    block
                    text={t('common.actions.Save')}
                    icon={<SaveOutlined/>}
                />}
            />
        </Form>
    );
}