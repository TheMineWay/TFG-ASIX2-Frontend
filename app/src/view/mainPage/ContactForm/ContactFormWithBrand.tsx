import { Card, Col, Row } from 'antd';
import { t } from 'i18next';
import React from 'react'
import SectionTitle from '../../shared/SectionTitle';
import ContactForm from '../../contactForm/ContactForm';

export default function ContactFormWithBrand() {
    return (
        <Row
            gutter={[24, 24]}
        >
            <Col span={24}>
                <SectionTitle>{t('view.contactForm.Title')}</SectionTitle>
            </Col>
            <Col
                xs={24}
            >
                <Card>
                    <ContactForm />
                </Card>
            </Col>
        </Row>
    );
}