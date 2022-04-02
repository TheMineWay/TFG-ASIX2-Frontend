import { Button, Col, Drawer, Row } from 'antd';
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
                            <Button
                                type={l.lang === language ? 'primary' : 'default'}
                                icon={l.flag}
                                block
                                onClick={() => {
                                    setLanguage(l.lang);
                                    props.hide();
                                }}
                            >
                                {t(`languages.${l.lang}`)}
                            </Button>
                        </Col>
                    ))
                }
            </Row>
        </Drawer>
    );
}