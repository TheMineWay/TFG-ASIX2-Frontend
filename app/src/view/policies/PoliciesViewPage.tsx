import { Card, Col, Row } from "antd";
import { t } from "i18next";

type PolicySection = {
    title: string;
    text: string;
}

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
    )

    return (
        <PolicyContainer>
            <Card>
                <Row
                    gutter={[12, 12]}
                >
                    <Col
                        span={24}
                    >
                        <BigTitle>{t('view.policies.Title')}</BigTitle>
                    </Col>
                </Row>
            </Card>
        </PolicyContainer>
    );
}