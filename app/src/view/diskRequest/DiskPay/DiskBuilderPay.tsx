import { PayCircleOutlined } from "@ant-design/icons";
import { Col, Form, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { t } from "i18next";
import notificationErrorDisplay from "../../errors/display/NotificationErrorDisplay";
import PaymentFormItem from "../../form/PaymentFormItem";
import SubmitFormItem from "../../form/SubmitFormItem";

export type DiskBuilderSendFormValues = {
    card: string;
    owner: string;
    cvc: string;
    expiresAt: Date;
}

export default function DiskBuilderPay() {

    const [form] = useForm<DiskBuilderSendFormValues>();

    const submit = (values: DiskBuilderSendFormValues) => {
        if(!values.card || !values.cvc || !values.expiresAt || !values.owner) {
            notificationErrorDisplay({
                code: '406',
                section: 'frontend',
            });
            return;
        }
    }

    return (
        <>
            <Form
                form={form}
                layout='vertical'
                onFinish={submit}
            >
                <Row>
                    <Col span={24}>
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
                    </Col>
                    <Col span={24}>
                        <SubmitFormItem
                            text={t('view.diskRequest.step.pay.NextBtn')}
                            icon={<PayCircleOutlined/>}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    );
}