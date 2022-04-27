import { SaveOutlined } from '@ant-design/icons';
import { Avatar, Col, Form, List, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { TransferItem } from 'antd/lib/transfer';
import { t } from 'i18next';
import { useEffect } from 'react';
import useCoins from '../../../hooks/coins/useCoins';
import { InventoryItem } from '../../../hooks/inventory/useInventory';
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import NumberFormItem from '../../form/NumberFormItem';
import SingleSelectFormItem from '../../form/SingleSelectFormItem';
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
    const { DisplayPrice } = useCoins();

    useEffect(() => {
        form.setFieldsValue(props.originalValue);
    }, []);

    const datasource: TransferItem[] = props.inventory.filter((i) => !i.isDrive).map((i) => ({
        title: i.name,
        key: i.id,
        chosen: true
    })) ?? [];

    const submit = (values: DiskBuilderFormValues) => {
        try {
            if(!values.disk) throw { code: 406, section: 'frontend' };
            props.onSave(values);
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
    }

    return (
        <Form
            form={form}
            onFinish={submit}
            initialValues={props.originalValue}
            layout='vertical'
        >
            <Row
                gutter={[12, 12]}
            >
                <Col
                    xs={24}
                    lg={12}
                >
                    <NumberFormItem
                        name='amount'
                        min={1}
                        max={128}
                        label={t('view.diskRequest.step.build.form.Amount')}
                    />
                </Col>
                <Col
                    xs={24}
                    lg={12}
                >
                    <SingleSelectFormItem
                        required requiredInvisibility
                        name='disk'
                        label={t('view.diskRequest.step.build.form.Disk')}
                        options={props.inventory.filter((i) => i.isDrive).map((i) => ({
                            title: <>{i.name} - <DisplayPrice price={i.price}/></>,
                            key: i.id,
                        }))}
                    />
                </Col>
                <Col span={24}>
                    <TransferFormItem
                        initial={props.originalValue.items}
                        name='items'
                        label={t('view.diskRequest.step.build.form.Items')}
                        datasource={datasource}
                        pagination={{
                            pageSize: 5,
                        }}
                        render={(i) => {

                            const item: InventoryItem | undefined = props.inventory.find((it) => it.id === i.key);

                            if (!item) return <>{i.title}</>

                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={i.title}
                                        avatar={<Avatar src={item.imageUrl} />}
                                        description={<DisplayPrice price={item.price}/>}
                                    />
                                </List.Item>
                            );
                        }}
                    />
                </Col>
            </Row>

            <SubmitFormItem
                text={t('view.diskRequest.step.build.actions.SavePage')}
                icon={<SaveOutlined />}
            />
        </Form>
    )
}