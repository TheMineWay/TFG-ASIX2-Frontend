import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Result, Row, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';
import CheckFormItem from '../form/CheckFormItem';
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
    policy!: boolean;
}

export default function ContactForm() {

    const [form] = useForm<ContactFormDTO>();
    const [loading, setLoading] = useState<boolean>(false);

    const [sent, setSent] = useState<boolean>(false);

    const submit = async (values: ContactFormDTO): Promise<void> => {
        setLoading(true);
        try {
            if (!values.policy) {
                throw {
                    code: 'must-accept-policy',
                    section: 'form',
                };
            }

            await request<{}>('post', '/actions/contactForm/send', values);
            form.resetFields();
            setSent(true);
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    if (sent) return (
        <Result
            status='success'
            title={t('view.contactForm.form.result.Title')}
            subTitle={t('view.contactForm.form.result.Subtitle')}
            extra={(
                <Button
                    type='primary'
                    onClick={() => setSent(false)}
                >{t('view.contactForm.form.result.SendAnother')}</Button>
            )}
        />
    )

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
                        min={2}
                        max={55}
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
                        max={450}
                    />
                </Col>
                <Col
                    span={24}
                >
                    <CheckFormItem
                        required
                        name='policy'
                        text={<small>{t('view.signup.AcceptPP')} <Link to="/privacy" target='_blank'>{t('common.other.privacyPolicy')}</Link>.</small>}
                    />
                </Col>
                <Col
                    span={24}
                >
                    <Space>
                        <SubmitFormItem
                            text={t('view.contactForm.form.fields.Submit')}
                            icon={<SendOutlined />}
                            loading={loading}
                        />
                        <ResetFormItem />
                    </Space>
                </Col>
            </Row>
        </Form>
    );
}