import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Col, notification, Row } from "antd";
import { t } from "i18next";
import moment from "moment";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuthState from "../../../hooks/auth/useAuthState";
import useMyOpinion from "../../../hooks/opinions/useMyOpinion";
import OpinionForm from "./OpinionForm";

export default function OpinionNotification() {

    const [authState] = useAuthState();
    const { opinion } = useMyOpinion();
    const [cookies, setCookie, removeCookie] = useCookies();

    const notificationClosed = () => {
        notification.info({
            message: t('view.opinions.notification.close.DoShowAgain'),
            description: (
                <Row gutter={[12,12]}>
                    <Col span={12}>
                        <Button
                            block
                            onClick={() => {
                                setCookie('ask-for-opinion', false, {expires: moment().add('years', 1).toDate()});
                                notification.close('never-ask-again-opinion');
                            }}
                        >
                            {t('common.other.Yes')}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            block
                            type="primary"
                            onClick={() => notification.close('never-ask-again-opinion')}
                        >
                            {t('common.other.No')}
                        </Button>
                    </Col>
                </Row>
            ),
            icon: <QuestionCircleOutlined color="blue" />,
            duration: 15,
            key: 'never-ask-again-opinion'
        });
    }

    useEffect(() => {
        if((cookies['ask-for-opinion'] ?? true) === 'false') return;

        if (!authState || opinion === undefined) {
            notification.close('opinion-notification');
            return;
        }

        if (opinion !== null && opinion !== undefined) return;

        notification.info({
            message: t('view.opinions.notification.Title'),
            description: (
                <>
                    <p>{t('view.opinions.notification.Description')}</p>
                    <OpinionForm
                        authState={authState}
                    />
                </>
            ),
            duration: null,
            key: 'opinion-notification',
            onClose: notificationClosed,
        });
    }, [authState, opinion]);

    return (<></>);
}