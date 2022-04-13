import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import useCache from "../../../hooks/cache/useCache";
import useInventory from "../../../hooks/inventory/useInventory";
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

    const cache = useCache<DiskBuilderFormValues>({
        cacheId: 'disk-builder',
    });

    const [form] = useForm<DiskBuilderFormValues>();

    if (loading) return <Loading />;

    // TODO: submit data
    const submit = async (values: DiskBuilderFormValues): Promise<void> => {

    }

    return (
        <>
            <Form
                form={form}
                onFinish={submit}
            >
                
            </Form>
        </>
    );
}