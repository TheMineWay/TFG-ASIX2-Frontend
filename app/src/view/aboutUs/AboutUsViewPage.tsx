import { Col, Row } from "antd";
import { t } from "i18next";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

export default function AboutUsViewPage() {
    return (
        <Container>
            <Row
                gutter={[24, 24]}
            >
                <Col
                    span={24}
                >
                    <Row
                        gutter={[24, 24]}
                    >
                        <Col span={24}>
                            <SectionTitle>{t('view.aboutUs.service.Title')}</SectionTitle>
                        </Col>
                        <Col
                            xs={24}
                            md={14}
                            xl={16}
                        >
                            {
                                ['p1', 'p2', 'p3'].map((p) => (
                                    <p
                                        style={{
                                            textAlign: 'justify',
                                        }}
                                    >{t(`view.aboutUs.service.content.${p}`)}</p>
                                ))
                            }
                        </Col>
                        <Col
                            xs={0}
                            md={10}
                            xl={8}
                        >
                            <img
                                src={require('../../resources/aboutUs/our-service.jpg')}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}