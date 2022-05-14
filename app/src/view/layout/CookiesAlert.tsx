import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { t } from "i18next";
import { useEffect } from "react";

export default function CookiesAlert() {

    useEffect(() => {
        setTimeout(() => {
            notification.info({
                message: t('view.cookiesMessage.Title'),
                description: (
                    <>
                        <p
                            style={{
                                textAlign: 'justify',
                            }}
                        >{t('view.cookiesMessage.Message')}</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 10,
                            }}
                        >
                            <Button
                                block
                                color='green'
                                type='primary'
                                icon={<CheckOutlined/>}
                            >
                                {t('view.cookiesMessage.actions.Allow')}
                            </Button>
                            <Button
                                block
                                danger
                                type="primary"
                                icon={<CloseOutlined/>}
                            >
                                {t('view.cookiesMessage.actions.Deny')}
                            </Button>
                        </div>
                    </>
                ),
                placement: 'bottomRight',
                duration: null,
                
            });
        }, 10);
    }, []);

    return (
        <></>
    );
}