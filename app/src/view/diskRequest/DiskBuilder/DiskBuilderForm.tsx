import { SaveOutlined } from '@ant-design/icons';
import { Avatar, Form, List } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { TransferItem } from 'antd/lib/transfer';
import { t } from 'i18next';
import { useEffect } from 'react';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import NumberFormItem from '../../form/NumberFormItem';
import SubmitFormItem from '../../form/SubmitFormItem';
import TransferFormItem from '../../form/TransferFormItem';
import { DiskBuilderFormValues } from './DiskBuilderTool';

type Props = {
    onSave: (values: DiskBuilderFormValues) => void;
    originalValue: DiskBuilderFormValues;
    inventory: InventoryItem[];
}

export default function DiskBuilderForm(props: Props) {

    const [form] = useForm<DiskBuilderFormValues>();

    useEffect(() => {
        form.setFieldsValue(props.originalValue);
    }, []);

    const datasource: TransferItem[] = props.inventory.map((i) => ({
        title: i.name,
        key: i.id,
        chosen: true
    })) ?? [];

    const submit = (values: DiskBuilderFormValues) => {
        props.onSave(values);
    }

    return (
        <Form
            form={form}
            onFinish={submit}
            initialValues={props.originalValue}
            layout='vertical'
        >
            <NumberFormItem
                name='amount'
                min={1}
                max={32}
                label={t('view.diskRequest.step.build.form.Amount')}
            />
            <TransferFormItem
                initial={props.originalValue.items}
                name='items'
                label={t('view.diskRequest.step.build.form.Items')}
                datasource={datasource}
                render={(i) => {

                    const item: InventoryItem | undefined = props.inventory.find((it) => it.id === i.key);

                    if(!item) return <>{i.title}</>

                    return (
                        <List.Item>
                            <List.Item.Meta
                                title={i.title}
                                avatar={<Avatar src={item.imageUrl}/>}
                            />
                        </List.Item>
                    );
                }}
            />
            <SubmitFormItem
                text={t('view.diskRequest.step.build.actions.SavePage')}
                icon={<SaveOutlined/>}
            />
        </Form>
    )
}