import { Card, Col, Image, Row } from "antd";

type Props = {
    hoverable?: boolean;
    src: string;
    preview?: boolean;
    children: JSX.Element | JSX.Element[];
    actions?: JSX.Element[];
}

export default function ImageSidedCard(props: Props) {
    return (
        <Card
            hoverable={props.hoverable}
            bodyStyle={{ padding: 0 }}
        >
            <Row>
                <Col
                    xxl={6}
                    md={8}
                    xs={24}
                >
                    <Image
                        width='100%'
                        src={props.src}
                        preview={props.preview}
                        style={{
                            objectFit: 'cover'
                        }}
                        height='100%'
                    />
                </Col>
                <Col
                    xxl={18}
                    md={16}
                    xs={24}
                >
                    <div
                        style={{
                            padding: 25,
                            display: 'flex',
                            alignContent: 'space-between',
                            width: '100%',
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        <div style={{width: '100%'}}>
                            {props.children}
                        </div>
                        <div style={{width: '100%'}}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                {
                                    props.actions?.map((action) => (
                                        <div
                                            style={{

                                            }}
                                        >
                                            {action}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
}