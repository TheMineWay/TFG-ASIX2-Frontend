import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row } from 'antd';
import { t } from 'i18next';
import '../../shared/styles/carousel.css';

type MainPageCarouselSlide = {
    image: string;
    id: string;
}

const slides: MainPageCarouselSlide[] = [
    {
        image: require('../../../resources/mainPage/slides/grand-opening.jpg'),
        id: 'grand-opening',
    },
    {
        image: require('../../../resources/mainPage/slides/we-make-it-look-easy.jpg'),
        id: 'we-make-it-look-easy',
    }
];

export default function AnnouncesCarousel() {
    return (
        <>
            <Carousel
                autoplay
                effect='fade'
                autoplaySpeed={5000}
                arrows={true}
                prevArrow={<LeftOutlined size={5}/>}
                nextArrow={<RightOutlined size={5}/>}
            >
                {
                    slides.map((slide) => (
                        <div>
                            <div style={{
                                height: 350,
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("${slide.image}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
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