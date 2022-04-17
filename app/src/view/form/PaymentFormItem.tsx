import { Col as AntCol, Row } from "antd";
import CreditCardFormItem from "./CreditCardFormItem";

type Props = {
    cardFieldName: string;
    cardLabel: string;
}

export default function PaymentFormItem(props: Props) {

    const Col = (props: {children: JSX.Element}) => {
        return (
            <AntCol>
                {props.children}
            </AntCol>
        );
    }

    return (
        <Row>
            <Col>
                <CreditCardFormItem
                    name={props.cardFieldName}
                    label={props.cardLabel}
                />
            </Col>
        </Row>
    )
}