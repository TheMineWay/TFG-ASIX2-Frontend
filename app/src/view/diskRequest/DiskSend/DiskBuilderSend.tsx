import { RightOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import { InventoryItem } from "../../../hooks/inventory/useInventory"
import notificationErrorDisplay from "../../errors/display/NotificationErrorDisplay";
import FullAddressFormItem from "../../form/FullAddressFormItem";
import SubmitFormItem from "../../form/SubmitFormItem";

type Props = {
    inventory: InventoryItem[];
    onFinish: () => void;
    setSend: (sendOp: DiskSendOption) => void;
    initial?: DiskSendOption;
}

export type DiskSendOption = {
    country: string;
    city: string;
    address: string;
    postalCode: string;
}

export default function DiskBuilderSend(props: Props) {

    const [form] = useForm<DiskSendOption>();

    const submit = (values: DiskSendOption) => {

        if(!values.city || !values.country || !values.address || !values.postalCode) {
            notificationErrorDisplay({
                code: '406',
                section: 'frontend',
            });
            return;
        }

        props.setSend(values);
        props.onFinish();
    }

    return (
        <>
            <Form
                form={form}
                layout='vertical'
                initialValues={props.initial}
                onFinish={submit}
            >
                <FullAddressFormItem
                    countryFieldName="country"
                    countryLabel={t('view.diskRequest.step.send.form.Country')}
                    cityFieldName="city"
                    cityLabel={t('view.diskRequest.step.send.form.City')}
                    postalCodeFieldName="postalCode"
                    postalCodeLabel={t('view.diskRequest.step.send.form.PostalCode')}
                    addressFieldName={'address'}
                    addressLabel={t('view.diskRequest.step.send.form.Address')}
                />

                <SubmitFormItem
                    text={t('view.diskRequest.step.send.NextBtn')}
                    icon={<RightOutlined/>}
                />
            </Form>
        </>
    )
}