import { Col as AntCol, Row } from "antd";
import CreditCardFormItem from "./CreditCardFormItem";
import DateFormItem from "./DateFormItem";
import TextFormItem from "./TextFormItem";

type Props = {
    cardFieldName: string;
    cardLabel: string;
    ownerFieldName: string;
    ownerLabel: string;
    pinFieldName: string;
    pinLabel: string;
    expireFieldName: string;
    expireLabel: string;
}

export default function PaymentFormItem(props: Props) {

    const Col = (props: { children: JSX.Element }) => {
        return (
            <AntCol
                xs={24}
                md={12}
            >
                {props.children}
            </AntCol>
        );
    }

    return (
        <Row
            gutter={[24, 24]}
        >
            <Col>
                <CreditCardFormItem
                    required requiredInvisibility
                    name={props.cardFieldName}
                    label={props.cardLabel}
                />
            </Col>
            <Col>
                <Row
                    gutter={[24, 24]}
                >
                    <Col>
                        <TextFormItem
                            name={props.pinFieldName}
                            label={props.pinLabel}
                            min={3}
                            max={4}
                        />
                    </Col>
                    <Col>
                        <DateFormItem
                            name={props.expireFieldName}
                            label={props.expireLabel}
                        />
                    </Col>
                </Row>
            </Col>
            <Col>
                <TextFormItem
                    required requiredInvisibility
                    name={props.ownerFieldName}
                    label={props.ownerLabel}
                    min={1}
                    max={128}
                />
            </Col>
        </Row>
    )
}