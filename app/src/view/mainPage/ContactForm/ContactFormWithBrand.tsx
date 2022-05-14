import { Card, Col, Row } from 'antd';
import { t } from 'i18next';
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
                md={12}
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                <Card
                    style={{
                        width: '100%',
                    }}
                >
                    <ContactForm />
                </Card>
            </Col>
            <Col
                xs={24}
                md={12}
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                <Card
                    hoverable
                    style={{
                        width: '100%',
                    }}
                    bodyStyle={{
                        margin: 0,
                        padding: 0,
                        height: '100%',
                    }}
                >
                    <Row
                        style={{
                            height: '100%',
                        }}
                    >
                        <Col
                            xs={24}
                            sm={12}
                            md={10}
                            xl={12}
                        >
                            <img
                                src={require('../../../resources/mainPage/contactForm/contacting-1.jpg')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Col>
                        <Col
                            xs={24}
                            sm={12}
                            md={14}
                            xl={12}
                            style={{
                                padding: 20,
                            }}
                        >
                            <h2
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >{t('view.contactForm.brand.Title')}</h2>
                            <p
                                style={{
                                    textAlign: 'justify',
                                }}
                            >
                                {t('view.contactForm.brand.MessageL1')}
                            </p>
                            <p
                                style={{
                                    textAlign: 'justify',
                                }}
                            >
                                {t('view.contactForm.brand.MessageL2')}
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}