import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Form, Row, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useState } from 'react';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import EmailFormItem from '../form/EmailFormItem';
import ResetFormItem from '../form/ResetFormItem';
import SubmitFormItem from '../form/SubmitFormItem';
import TextAreaFormItem from '../form/TextAreaFormItem';
import TextFormItem from '../form/TextFormItem';

// Class with type validations
export class ContactFormDTO {
    email!: string;
    name!: string;
    message!: string;
}

export default function ContactForm() {

    const [form] = useForm<ContactFormDTO>();
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (values: ContactFormDTO): Promise<void> => {
        setLoading(true);
        try {

        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={submit}
        >
            <Row
                gutter={[12, 12]}
            >
                <Col
                    xs={24}
                    md={12}
                >
                    <TextFormItem
                        icon={<UserOutlined />}
                        label={t('view.contactForm.form.fields.Name')}
                        name='name'
                        required
                    />
                </Col>
                <Col
                    xs={24}
                    md={12}
                >
                    <EmailFormItem
                        name='email'
                        required
                    />
                </Col>
                <Col
                    span={24}
                >
                    <TextAreaFormItem
                        label={t('view.contactForm.form.fields.Message')}
                        name='message'
                        required
                        showCount
                        max={1000}
                    />
                </Col>
                <Col
                    span={24}
                >
                    <Space>
                        <SubmitFormItem
                            text={t('view.contactForm.form.fields.Submit')}
                            icon={<SendOutlined/>}
                            loading={loading}
                        />
                        <ResetFormItem />
                    </Space>
                </Col>
            </Row>
        </Form>
    );
}