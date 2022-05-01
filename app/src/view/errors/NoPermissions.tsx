import { Button, Result } from "antd";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

type Props = {}

export default function NoPermissions(props: Props) {
    const { t, i18n } = useTranslation();
    return (
        <Result
            status='403'
            title={t('errors.frontend.401.Title')}
            subTitle={t('errors.frontend.401.Subtitle')}
            extra={<Link to="/"><Button type='primary'>{t('actions.GoHome')}</Button></Link>}
        />
    );
}