import { notification } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import useAuthState from "../../../hooks/auth/useAuthState";
import OpinionForm from "./OpinionForm";

export default function OpinionNotification() {

    const [authState] = useAuthState();

    useEffect(() => {
        if(!authState) {
            notification.close('opinion-notification');
            return;
        }

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
    }, [authState]);

    return (<></>);
}