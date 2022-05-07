import { Card, Col, Rate, Row } from "antd";
import usePublicOpinions from "../../../hooks/opinions/usePublicOpinions";
import DateDisplay from "../../shared/DateDisplay";

export default function ViewPublicOpinions() {

    const { opinions } = usePublicOpinions();

    return (
        <Row>
            {
                opinions?.map((o) => (
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
                                    rowGap: 10
                                }}
                            >
                                <Rate value={o.score} disabled />
                                <blockquote
                                    style={{
                                        textAlign: 'center',
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