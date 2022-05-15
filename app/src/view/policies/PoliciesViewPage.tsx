import { Card, Col, Row } from "antd";
import { t } from "i18next";

type PolicySection = {
    id: string;
    text: JSX.Element;
    image?: string;
}

const GenerateList = (props: { id: string, ids: string[], liId?: string }) => (
    <ul>
        {
            props.ids.map((i) => (
                <li><b>{t(`view.policies.sections.${props.id}.${props.liId ?? 'li'}.${i}.Label`)}: </b>{t(`view.policies.sections.${props.id}.${props.liId ?? 'li'}.${i}.Text`)}</li>
            ))
        }
    </ul>
);

const sections: PolicySection[] = [
    {
        id: 'provided-info',
        text: (
            <>
                <p>{t('view.policies.sections.provided-info.P-1')}</p>
                <GenerateList
                    id="provided-info"
                    ids={['1', '2']}
                />
            </>
        ),
        image: require('../../resources/policy/data-store.jpg'),
    }
];

export default function PoliciesViewPage() {

    const PolicyContainer = (props: { children: JSX.Element | JSX.Element[] }) => (
        <Row
            justify="center"
        >
            <Col
                xs={24}
                md={20}
                xl={18}
                xxl={16}
            >
                {props.children}
            </Col>
        </Row>
    )

    const BigTitle = (props: { children: string }) => (
        <h1
            style={{
                color: 'var(--ant-primary-color)',
                fontWeight: 'bolder',
                textAlign: 'center',
                fontSize: 35,
            }}
        >{props.children}</h1>
    );

    const Title = (props: { children: string }) => (
        <h2
            style={{
                color: 'var(--ant-primary-color)',
                fontWeight: 'bold',
                fontSize: 25,
            }}
        >{props.children}</h2>
    );

    return (
        <PolicyContainer>
            <Row
                gutter={[12, 12]}
            >
                <Col
                    span={24}
                >
                    <BigTitle>{t('view.policies.Title')}</BigTitle>
                </Col>
                {
                    sections.map((section) => (
                        <Col span={24}>
                            <Card
                                hoverable
                                bodyStyle={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <Row
                                    gutter={[0, 0]}
                                >
                                    <Col
                                        xs={24}
                                        lg={section.image ? 16 : 24}
                                    >
                                        <div
                                            style={{
                                                padding: 25,
                                            }}
                                        >
                                            <Title>{t(`view.policies.sections.${section.id}.Title`)}</Title>
                                            <p
                                                style={{
                                                    textAlign: 'justify',
                                                }}
                                            >{section.text}</p>
                                        </div>
                                    </Col>
                                    {
                                        section.image && (
                                            <Col
                                                xs={0}
                                                lg={8}
                                            >
                                                <img
                                                    src={section.image}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </PolicyContainer>
    );
}