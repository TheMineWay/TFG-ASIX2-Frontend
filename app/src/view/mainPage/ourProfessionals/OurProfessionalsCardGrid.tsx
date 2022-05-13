import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { t } from 'i18next';
import moment from 'moment';
import { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';

type Social = {
    id: string;
    link: string;
    icon: JSX.Element;
}

type Professional = {
    name: string;
    image: string;
    id: string;
    social: Social[];
    imageOnClicks?: string;
}

const professionals: Professional[] = [
    {
        name: 'Juanjo Romero',
        image: require('../../../resources/mainPage/professionals/juanjo-romero.jpeg'),
        id: 'juanjo-romero',
        social: [],
    },
    {
        name: 'Joel Campos',
        image: moment().isAfter(moment('2022-10-1')) ? require('../../../resources/mainPage/professionals/joel-kampos.jpg') : require('../../../resources/mainPage/professionals/joel-campos.jpg'),
        id: 'joel-campos',
        social: [
            {
                id: 'github',
                icon: <GithubOutlined />,
                link: 'https://github.com/TheMineWay',
            },
            {
                id: 'linkedin',
                icon: <LinkedinOutlined />,
                link: 'https://www.linkedin.com/in/joelcamposoliva/',
            },
        ],
    },
    {
        name: 'Iker Torres',
        image: require('../../../resources/mainPage/professionals/iker-torres.PNG'),
        id: 'iker-torres',
        social: [],
        imageOnClicks: require('../../../resources/mainPage/professionals/iker-torres-2.jpg')
    },
]
    .sort(() => Math.random() > Math.random() ? 1 : -1);

const SocialIcons = (props: { social: Social[] }) => (
    <>
        {
            props.social.map((item) => (
                <Button
                    size='large'
                    style={{
                        height: 50,
                        fontSize: 25,
                    }}
                    type='link'
                    onClick={() => {
                        window.open(item.link, '_blank');
                    }}
                >
                    {item.icon}
                </Button>
            ))
        }
    </>
)

const ProfessionalCard = (props: { professional: Professional }) => {

    const [clicks, setClicks] = useState<number>(0);

    return (
        <Col
            xs={24}
            sm={17}
            lg={12}
            xxl={7}
            style={{
                display: 'flex',
                alignItems: 'stretch',
            }}
        >
            <Card
                style={{
                    width: '100%'
                }}
                hoverable
                bodyStyle={{
                    margin: 0,
                    padding: 0,
                    height: '100%',
                }}
            >
                <Row
                    gutter={[0, 0]}
                    style={{
                        height: '100%',
                    }}
                >
                    <Col
                        xs={24}
                        sm={15}
                        md={14}
                        style={{
                            padding: 25,
                            display: 'flex',
                            alignItems: 'stretch',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignContent: 'space-between',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <div
                                style={{ width: '100%' }}
                            >
                                <h2
                                    style={{
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                    }}
                                >
                                    {props.professional.name}
                                </h2>
                                <p>
                                    {t(`view.mainPage.sections.professionals.list.${props.professional.id}.Description`)}
                                </p>
                            </div>
                            <div style={{ width: '100%', minHeight: 50, display: 'flex', alignItems: 'flex-end' }}>
                                <SocialIcons social={props.professional.social} />
                            </div>
                        </div>
                    </Col>
                    <Col
                        xs={24}
                        sm={9}
                        md={10}
                    >
                        <img
                            src={clicks < 14 ? props.professional.image : (props.professional.imageOnClicks || props.professional.image)}
                            width='100%'
                            style={{
                                objectFit: 'cover',
                                height: '100%',
                                maxHeight: 525,
                            }}
                            onClick={() => {
                                if (props.professional.imageOnClicks) {
                                    setClicks(clicks + 1);
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}

export default function OurProfessionalsCardGrid() {
    return (
        <Row
            justify="center"
            gutter={[24, 24]}
        >
            <Col span={24}>
                <SectionTitle>{t('view.mainPage.sections.professionals.Title')}</SectionTitle>
            </Col>
            <Col span={24}>
                <Row
                    gutter={[32, 32]}
                    justify='center'
                >
                    {
                        professionals.map((professional) => (
                            <ProfessionalCard professional={professional} />
                        ))
                    }
                </Row>
            </Col>
        </Row>
    );
}