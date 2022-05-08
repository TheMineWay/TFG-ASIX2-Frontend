import { Card, Col, Row } from 'antd';
import { t } from 'i18next';
import SectionTitle from '../../shared/SectionTitle';

type Offer = {
    id: string;
    image: string;
}

const offers: Offer[] = [
    {
        id: 'customized-disks',
        image: require('../../../resources/mainPage/weOffer/customized-disks.jpg'),
    },
    {
        id: 'all-from-home',
        image: require('../../../resources/mainPage/weOffer/all-from-home.jpg'),
    },
    {
        id: 'any-device',
        image: require('../../../resources/mainPage/weOffer/any-device.jpg')
    }
];

export default function WeOfferView() {
    return (
        <Row
            gutter={[24, 24]}
            justify='center'
        >
            <Col span={24}>
                <SectionTitle>{t('view.mainPage.sections.weOffer.Title')}</SectionTitle>
            </Col>
            <Col span={24}>
                <Row
                    gutter={[24, 24]}
                    justify='center'
                >
                    {
                        offers.map((offer) => (
                            <Col
                                xs={24}
                                sm={17}
                                lg={12}
                                xl={8}
                                xxl={6}
                                style={{
                                    display: 'flex',
                                    alignItems: 'stretch',
                                }}
                            >
                                <Card
                                    hoverable
                                    bodyStyle={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        padding: 0,
                                        margin: 0,
                                    }}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <img
                                            src={offer.image}
                                            style={{
                                                objectFit: 'cover',
                                                height: 200,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            padding: 25,
                                        }}
                                    >
                                        <h2
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >{t(`view.mainPage.sections.weOffer.${offer.id}.Title`)}</h2>
                                        <p
                                            style={{
                                                textAlign: 'justify',
                                            }}
                                        >{t(`view.mainPage.sections.weOffer.${offer.id}.Description`)}</p>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col
                xs={24}
                md={17}
                lg={24}
                xxl={15}
            >
                <Card
                    hoverable
                >
                    <Row
                        gutter={[24, 24]}
                    >
                        <Col
                            xs={24}
                            md={12}
                        >
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/BOLm1QMWi3c"
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </Col>
                        <Col
                            xs={24}
                            md={12}
                        >
                            <h2
                                style={{
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                }}
                            >{t('view.mainPage.sections.video.Title')}</h2>
                            <p>{t('view.mainPage.sections.video.Description')}</p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}