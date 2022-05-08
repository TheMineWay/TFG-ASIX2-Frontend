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
        </Row>
    );
}