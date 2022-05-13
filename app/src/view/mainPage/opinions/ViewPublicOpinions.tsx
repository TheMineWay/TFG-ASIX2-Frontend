import { Card, Col, Rate, Row } from "antd";
import { t } from "i18next";
import usePublicOpinions from "../../../hooks/opinions/usePublicOpinions";
import DateDisplay from "../../shared/DateDisplay";
import SectionTitle from "../../shared/SectionTitle";

export default function ViewPublicOpinions() {

    const { opinions } = usePublicOpinions();

    function randomSort<T = any>(array: T[]) {
        return array.sort((a, b) => Math.random() > Math.random() ? 1 : -1);
    }

    const opinionsToVisualize = [
        ...randomSort((opinions?.filter((o) => o.score == 5) ?? [])).slice(0, 4),
        ...randomSort((opinions?.filter((o) => o.score == 4) ?? [])).slice(0, 1),
        ...randomSort((opinions?.filter((o) => o.score == 3) ?? [])).slice(0, 1),
        ...randomSort((opinions?.filter((o) => o.score == 2) ?? [])).slice(0, 1),
        ...randomSort((opinions?.filter((o) => o.score == 1) ?? [])).slice(0, 1),
    ];

    return (
        <Row
            justify="center"
            gutter={[24, 24]}
        >
            <Col span={24}>
                <SectionTitle>{t('view.opinions.Title')}</SectionTitle>
            </Col>
            {
                opinionsToVisualize.map((o) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xxl={6}
                    >
                        <Card
                            hoverable
                            bodyStyle={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    rowGap: 10,
                                }}
                            >
                                <Rate value={o.score} disabled />
                                <blockquote
                                    style={{
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    {o.opinion}
                                </blockquote>
                                <small>
                                    <DateDisplay>{o.createdAt}</DateDisplay>
                                </small>
                            </div>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
}