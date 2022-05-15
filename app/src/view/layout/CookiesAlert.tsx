import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { t } from "i18next";
import moment from "moment";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function CookiesAlert() {

    const [cookies, setCookie, removeCookie] = useCookies();

    const accept = () => {
        setCookie('allow-cookies', 'true', {expires: moment().add('months', 1).toDate()});
        notification.close('cookies-alert');
    }

    const deny = () => {
        setCookie('allow-cookies', 'false', {expires: moment().add('months', 1).toDate()});
        notification.close('cookies-alert');
    }

    useEffect(() => {

        if(['true', 'false'].includes(cookies['allow-cookies'])) return;

        setTimeout(() => {
            notification.info({
                key: 'cookies-alert',
                message: <p>{t('view.cookiesMessage.Title')} 🍪</p>,
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
                                onClick={accept}
                            >
                                {t('view.cookiesMessage.actions.Allow')}
                            </Button>
                            <Button
                                block
                                danger
                                type="primary"
                                icon={<CloseOutlined/>}
                                onClick={deny}
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