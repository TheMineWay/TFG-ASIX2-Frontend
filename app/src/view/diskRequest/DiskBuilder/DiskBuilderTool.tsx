import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TransferItem } from "antd/lib/transfer";
import useCache from "../../../hooks/cache/useCache";
import useInventory from "../../../hooks/inventory/useInventory";
import TransferFormItem from "../../form/TransferFormItem";
import Loading from "../../shared/Loading";

export type DiskBuilderFormValues = {
    a: string;
}

type Props = {
    onFinish: () => void;
}

export default function DiskBuilderTool(props: Props) {

    const inventory = useInventory();
    const loading = inventory.loading;

    const [form] = useForm<DiskBuilderFormValues>();

    if (loading) return <Loading />;

    // TODO: submit data
    const submit = async (values: DiskBuilderFormValues): Promise<void> => {
        props.onFinish();
    }

    const datasource: TransferItem[] = inventory.inventory?.map((i) => ({
        title: i.name,
        key: i.id,
        chosen: true,
    })) ?? [];

    return (
        <>
            <Form
                form={form}
                onFinish={submit}
                layout='vertical'
            >
                <TransferFormItem
                    name='items'
                    datasource={datasource}
                    label={'Ítems'}
                />
            </Form>
        </>
    );
}