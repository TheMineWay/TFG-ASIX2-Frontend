import { RightOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import { InventoryItem } from "../../../hooks/inventory/useInventory"
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
        props.setSend(values);
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
                />

                <SubmitFormItem
                    text={t('view.diskRequest.step.send.NextBtn')}
                    icon={<RightOutlined/>}
                />
            </Form>
        </>
    )
}