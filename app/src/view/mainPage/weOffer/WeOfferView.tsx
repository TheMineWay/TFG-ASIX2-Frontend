import { Col, Row } from 'antd';
import { t } from 'i18next';
import React from 'react'
import SectionTitle from '../../shared/SectionTitle';

export default function WeOfferView() {
    return (
        <Row
            gutter={[24, 24]}
        >
            <Col span={24}>
                <SectionTitle>{t('view.mainPage.sections.weOffer.Title')}</SectionTitle>
            </Col>
        </Row>
    );
}