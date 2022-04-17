import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import PaymentFormItem from "../../form/PaymentFormItem";

export type DiskBuilderSendFormValues = {

}

export default function DiskBuilderPay() {

    const [form] = useForm<DiskBuilderSendFormValues>();

    const submit = (values: DiskBuilderSendFormValues) => {

    }

    return (
        <>
            <Form
                form={form}
                layout='vertical'
                onFinish={submit}
            >
                <PaymentFormItem
                    cardFieldName="card"
                    cardLabel={t('view.diskRequest.step.pay.form.Card')}
                    ownerFieldName="owner"
                    ownerLabel={t('view.diskRequest.step.pay.form.Owner')}
                    pinFieldName="cvc"
                    pinLabel={t('view.diskRequest.step.pay.form.Pin')}
                    expireFieldName="expiresAt"
                    expireLabel={t('view.diskRequest.step.pay.form.ExpiresAt')}
                />
            </Form>
        </>
    );
}