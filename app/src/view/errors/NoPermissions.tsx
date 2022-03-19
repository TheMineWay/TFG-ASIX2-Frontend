import { Button, Result } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";

type Props = {}

export default function NoPermissions(props: Props) {
    return (
        <Result
            status='403'
            title={t('errors.frontend.401.Title')}
            subTitle={t('errors.frontend.401.Subtitle')}
            extra={<Link to="/"><Button type='primary'>{t('actions.GoHome')}</Button></Link>}
        />
    );
}