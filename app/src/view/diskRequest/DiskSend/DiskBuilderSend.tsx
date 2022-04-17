import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
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
            >
                <FullAddressFormItem
                    countryFieldName="country"
                    countryLabel={"Country"}
                    cityFieldName="city"
                    cityLabel={"City"}
                />
            </Form>
        </>
    )
}