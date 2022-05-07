import { Card, Carousel, Col, Row } from 'antd';

type MainPageCarouselSlide = {
    image: string;
    title: string;
    description: string;
}

const slides: MainPageCarouselSlide[] = [
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUWlMyrVfcOfYVok9N1xfCqQqwwlAXSatbg&usqp=CAU',
        title: "Main title",
        description: "Some random text as the description"
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
                                        <Card>
                                            <h1>{slide.title}</h1>
                                            <p>{slide.description}</p>
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