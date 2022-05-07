import { Empty } from 'antd';
import { t } from 'i18next';

export default function NoData() {
    return (
        <Empty
            description={t('common.empty.Description')}
        />
    );
}
