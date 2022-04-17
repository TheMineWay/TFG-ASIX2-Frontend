import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import { InventoryItem } from "../../../hooks/inventory/useInventory"
import FullAddressFormItem from "../../form/FullAddressFormItem";

type Props = {
    inventory: InventoryItem[];
    onFinish: () => void;
    setSend: (sendOp: DiskSendOption) => void;
}

export type DiskSendOption = {
    country: string;
    city: string;
    address: string;
    postalCode: string;
}

export default function DiskBuilderSend(props: Props) {

    const [form] = useForm<DiskSendOption>();

    return (
        <>
            <Form
                form={form}
                layout='vertical'
            >
                <FullAddressFormItem
                    countryFieldName="country"
                    countryLabel={t('view.diskRequest.step.send.form.Country')}
                    cityFieldName="city"
                    cityLabel={t('view.diskRequest.step.send.form.City')}
                    postalCodeFieldName="postalCode"
                    postalCodeLabel={t('view.diskRequest.step.send.form.PostalCode')}
                />
            </Form>
        </>
    )
}