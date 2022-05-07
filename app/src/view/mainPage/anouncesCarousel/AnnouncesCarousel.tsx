import { Card, Carousel, Col, Row } from 'antd';
import { t } from 'i18next';

type MainPageCarouselSlide = {
    image: string;
    id: string;
}

const slides: MainPageCarouselSlide[] = [
    {
        image: require('../../../resources/mainPage/slides/grand-opening.png'),
        id: 'grand-opening',
    }
];

export default function AnnouncesCarousel() {
    return (
        <>
            <Carousel
                autoplay
            >
                {
                    slides.map((slide) => (
                        <div>
                            <div style={{
                                height: 350,
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage: `url("${slide.image}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Row
                                    gutter={[24,24]}
                                    justify='center'
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={10}
                                        xl={8}
                                        xxl={6}
                                    >
                                        <Card
                                            hoverable
                                        >
                                            <h1
                                                style={{
                                                    fontWeight: 'bold',
                                                }}
                                            >{t(`view.mainPage.carousel.slides.${slide.id}.Title`)}</h1>
                                            <p>{t(`view.mainPage.carousel.slides.${slide.id}.Description`)}</p>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))
                }
            </Carousel>
        </>
    );
}