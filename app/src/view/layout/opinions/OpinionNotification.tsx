import { notification } from "antd";
import { t } from "i18next";
import { useEffect } from "react";
import useAuthState from "../../../hooks/auth/useAuthState";
import useMyOpinion from "../../../hooks/opinions/useMyOpinion";
import OpinionForm from "./OpinionForm";

export default function OpinionNotification() {

    const [authState] = useAuthState();
    const { opinion } = useMyOpinion();

    useEffect(() => {
        if(!authState || opinion === undefined) {
            notification.close('opinion-notification');
            return;
        }

        if(opinion !== null && opinion !== undefined) return;

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
        });
    }, [authState, opinion]);

    return (<></>);
}