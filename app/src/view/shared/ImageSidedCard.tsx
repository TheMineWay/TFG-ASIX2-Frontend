import { Card, Col, Image, Row } from "antd";

type Props = {
    hoverable?: boolean;
    src: string;
    preview?: boolean;
    children: JSX.Element | JSX.Element[];
}

export default function ImageSidedCard(props: Props) {
    return (
        <Card
            hoverable={props.hoverable}
            bodyStyle={{ padding: 0 }}
        >
            <Row
                gutter={[24, 24]}
            >
                <Col
                    xxl={8}
                >
                    <Image
                        width={'100%'}
                        src={props.src}
                        preview={props.preview}
                    />
                </Col>
                <Col
                    xxl={16}
                >
                    {props.children}
                </Col>
            </Row>
        </Card>
    );
}