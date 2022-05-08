import { GithubOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { t } from 'i18next';
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
}

const professionals: Professional[] = [
    {
        name: 'Juanjo Romero',
        image: require('../../../resources/mainPage/professionals/juanjo-romero.jpeg'),
        id: 'juanjo-romero',
        social: [],
    },
    {
        name: 'Iker Torres',
        image: require('../../../resources/mainPage/professionals/juanjo-romero.jpeg'),
        id: 'iker-torres',
        social: [],
    },
    {
        name: 'Joel Campos',
        image: require('../../../resources/mainPage/professionals/juanjo-romero.jpeg'),
        id: 'joel-campos',
        social: [
            {
                id: 'github',
                icon: <GithubOutlined />,
                link: 'https://github.com/TheMineWay',
            },
        ],
    },
].sort((a, b) => Math.random() > Math.random() ? 1 : -1);

const ProfessionalCard = (props: { professional: Professional }) => (

    <Col
        xs={24}
        lg={13}
        xxl={7}
    >
        <Card
            hoverable
            bodyStyle={{
                margin: 0,
                padding: 0
            }}
        >
            <Row
                gutter={[0, 0]}
            >
                <Col
                    xs={24}
                    sm={15}
                    md={14}
                    style={{
                        padding: 25,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'space-between',
                            justifyContent: 'center',
                            flexWrap: 'nowrap',
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                }}
                            >
                                {props.professional.name}
                            </h2>
                        </div>
                    </div>
                </Col>
                <Col
                    xs={24}
                    sm={9}
                    md={10}
                >
                    <img
                        src={props.professional.image}
                        width='100%'
                    />
                </Col>
            </Row>
        </Card>
    </Col>
)

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