import { Col, Row } from "antd";
import { t } from "i18next";
import ResetFormItem from "./ResetFormItem";
import SubmitFormItem from "./SubmitFormItem";

type Props = {
    submit?: JSX.Element;
    reset?: JSX.Element | null;
}

export default function DrawerFormActions(props: Props) {
    return (
        <Row gutter={[12, 12]}>
            {
                props.reset === null ? (
                    <Col span={24}>
                        {
                            props.submit ?? <SubmitFormItem block text={t('common.actions.Send')} />
                        }
                    </Col>
                ) : (
                    <Col
                        xs={24}
                        md={12}
                    >
                        {
                            props.submit ?? <SubmitFormItem block text={t('common.actions.Send')} />
                        }
                    </Col>
                )
            }
            {
                props.reset !== null && (props.reset ? (
                    <Col
                        xs={24}
                        md={12}
                    >
                        {props.reset}
                    </Col>
                ) : (
                    <Col
                        xs={24}
                        md={12}
                    >
                        <ResetFormItem block />
                    </Col>
                ))
            }
        </Row>
    );
}