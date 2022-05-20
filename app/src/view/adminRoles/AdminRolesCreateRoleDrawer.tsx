import { PlusOutlined } from "@ant-design/icons";
import { Drawer, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import { useEffect, useState } from "react";
import notificationErrorDisplay from "../errors/display/NotificationErrorDisplay";
import SubmitFormItem from "../form/SubmitFormItem";
import TextFormItem from "../form/TextFormItem";

type Props = {
    visible: boolean;
    hide: () => void;
    createRole: (name: string) => Promise<void>;
}

export default function AdminRolesCreateRoleDrawer(props: Props) {

    const [form] = useForm<{ name: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (values: { name: string }) => {
        setLoading(true);
        try {
            await props.createRole(values.name);
            props.hide();
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        form.resetFields();
    }, [props.visible]);

    return (
        <Drawer
            visible={props.visible}
            onClose={props.hide}
            title={t('view.adminRoles.create.Title')}
        >
            <Form
                layout='vertical'
                form={form}
                onFinish={submit}
            >
                <TextFormItem
                    label={t('view.adminRoles.create.form.Name')}
                    name='name'
                    min={5}
                    max={25}
                    required
                />
                <SubmitFormItem
                    text={t('view.adminRoles.create.form.Create')}
                    block
                    icon={<PlusOutlined />}
                    loading={loading}
                />
            </Form>
        </Drawer>
    );
}