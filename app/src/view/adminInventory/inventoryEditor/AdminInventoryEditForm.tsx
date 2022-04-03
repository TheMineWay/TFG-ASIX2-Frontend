import { SaveOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { AdminInventory } from '../../../hooks/inventory/useAdminInventory';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import DrawerFormActions from '../../form/DrawerFormActions';
import ImageByUrlFormItem from '../../form/ImageByUrlFormItem';
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
                required requiredInvisibility
                name='name'
                label={t('view.inventory.list.headers.Name')}
                min={2}
                max={32}
            />
            <TextAreaFormItem
                required requiredInvisibility
                showCount
                name='description'
                label={t('view.inventory.list.headers.Description')}
                min={2}
                max={255}
            />
            <NumberFormItem
                required requiredInvisibility
                name='price'
                label={t('view.inventory.list.headers.Price') + " (€)"}
                min={0}
            />
            <SlideNumberFormItem
                required requiredInvisibility
                name='discount'
                label={t('view.inventory.list.headers.Discount') + " (%)"}
            />
            <NumberFormItem
                required requiredInvisibility
                name='stock'
                label={t('view.inventory.list.headers.Stock')}
                min={0}
            />
            <ImageByUrlFormItem
                required requiredInvisibility
                name='imageUrl'
                label={t('view.inventory.list.headers.ImageUrl')}
                min={1}
                max={511}
            />

            <DrawerFormActions
                submit={<SubmitFormItem
                    block
                    text={t('common.actions.Save')}
                    icon={<SaveOutlined />}
                    loading={props.adminInventory.loading}
                />}
            />
        </Form>
    );
}