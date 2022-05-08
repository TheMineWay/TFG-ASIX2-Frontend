import { Button, Col, Drawer, Popconfirm, Row } from 'antd';
import { t } from 'i18next';
import useLanguage from '../../../hooks/language/useLanguage';
import { Languages } from '../../../i18n/configureI18n';

type Props = {
    visible: boolean;
    hide: () => void;
}

const languages: {
    lang: Languages,
    flag?: JSX.Element,
}[] = [
        {
            lang: Languages.ca,
        },
        {
            lang: Languages.es,
        },
        {
            lang: Languages.en,
        }
    ];

export default function LanguageDrawer(props: Props) {

    const { language, setLanguage } = useLanguage();

    return (
        <Drawer
            visible={props.visible}
            onClose={props.hide}
            title={t('view.languageSelector.Title')}
        >
            <Row gutter={[12, 12]}>
                {
                    languages.map((l) => (
                        <Col span={24}>
                            <Popconfirm
                                okText={t('common.other.Yes')}
                                cancelText={t('common.other.No')}
                                title={(
                                    <>
                                        <p>{t('view.languageSelector.reloadPopConfirm.Title')}</p>
                                        <p>{t('view.languageSelector.reloadPopConfirm.Description')}</p>
                                    </>
                                )}
                                onConfirm={() => {
                                    setLanguage(l.lang);
                                    props.hide();
                                }}
                            >
                                <Button
                                    type={l.lang === language ? 'primary' : 'default'}
                                    icon={l.flag}
                                    block
                                >
                                    {t(`languages.${l.lang}`)}
                                </Button>
                            </Popconfirm>
                        </Col>
                    ))
                }
            </Row>
        </Drawer>
    );
}