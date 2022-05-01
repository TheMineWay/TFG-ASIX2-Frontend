import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Error404() {

    const { t } = useTranslation();

    return (
        <Result
            status="404"
            title={t('errors.frontend.404.Title')}
            subTitle={t('errors.frontend.404.Subtitle')}
            extra={<Link to="/"><Button type='primary'>{t('actions.GoHome')}</Button></Link>}
        />
    );
}
