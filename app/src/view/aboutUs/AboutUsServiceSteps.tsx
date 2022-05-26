import { Card, Col, Row, Timeline } from 'antd';
import { t } from 'i18next';

const { Item } = Timeline;

type ItemType = {
    key: string;
    image: string;
    dot?: JSX.Element;
}

export default function AboutUsServiceSteps() {

    const items: ItemType[] = [
        {
            key: 'request',
            image: require('../../resources/aboutUs/serviceSteps/request.jpg'),
        },
        {
            key: 'build',
            image: require('../../resources/aboutUs/serviceSteps/build.jpg'),
        },
    ];

    return (
        <Timeline
            mode='alternate'
            
        >
            {
                items.map((i, c) => (
                    <Item
                        dot={i.dot}
                    >
                        <Card
                            hoverable
                            bodyStyle={{
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            <Row
                                gutter={[0, 0]}
                            >
                                <Col
                                    xs={24}
                                    lg={14}
                                    order={c % 2 == 0 ? 1 : 2}
                                >
                                    <div
                                        style={{
                                            margin: 20,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >{t(`view.aboutUs.serviceSteps.steps.${i.key}.Title`)}</h3>
                                        <p>{t(`view.aboutUs.serviceSteps.steps.${i.key}.Text`)}</p>
                                    </div>
                                </Col>
                                <Col
                                    xs={0}
                                    lg={10}
                                    order={c % 2 == 0 ? 2 : 1}
                                >
                                    <img
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        src={i.image}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Item>
                ))
            }
        </Timeline>
    );
}