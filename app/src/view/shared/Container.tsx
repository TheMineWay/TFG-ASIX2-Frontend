import { Col, Row } from "antd";

type Props = {
    children: JSX.Element | JSX.Element[];
}

export default function Container(props: Props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <Row
                style={{width: '100%'}}
                justify='center'
            >
                <Col
                    xs={24}
                    sm={20}
                    md={18}
                    xxl={16}
                >
                    {props.children}
                </Col>
            </Row>
        </div>
    );
}