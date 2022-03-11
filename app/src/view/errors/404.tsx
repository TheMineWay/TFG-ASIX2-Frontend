import { Button, Result } from 'antd';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <Result
            status="404"
            title={t('errors.404.Title')}
            subTitle={t('errors.404.Subtitle')}
            extra={<Link to="/"><Button type='primary'>{t('actions.GoHome')}</Button></Link>}
        />
    );
}
