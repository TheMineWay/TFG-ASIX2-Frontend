import { PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { AdminInventory, CreateInventoryItem } from "../../../hooks/inventory/useAdminInventory";
import notificationErrorDisplay from "../../errors/display/NotificationErrorDisplay";
import CheckFormItem from "../../form/CheckFormItem";
import DrawerFormActions from "../../form/DrawerFormActions";
import ImageByUrlFormItem from "../../form/ImageByUrlFormItem";
import NumberFormItem from "../../form/NumberFormItem";
import SlideNumberFormItem from "../../form/SlideNumberFormItem";
import SubmitFormItem from "../../form/SubmitFormItem";
import TextAreaFormItem from "../../form/TextAreaFormItem";
import TextFormItem from "../../form/TextFormItem";

type Props = {
    adminInventory: AdminInventory;
}

export default function AdminInventoryAddItemForm(props: Props) {

    const { t, i18n } = useTranslation();
    const [form] = useForm<CreateInventoryItem>();
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (item: CreateInventoryItem) => {
        setLoading(true);
        try {
            await props.adminInventory.createItem({
                ...item,
                discount: item.discount ?? 0,
            });
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Form
            form={form}
            onFinish={submit}
            layout='vertical'
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
            <CheckFormItem
                name="isDrive"
                text={t('view.inventory.list.headers.IsDrive')}
            />

            <DrawerFormActions
                submit={<SubmitFormItem
                    text={t('common.actions.Add')}
                    icon={<PlusOutlined/>}
                    loading={loading}
                    block
                />}
            />
        </Form>
    );
}
