import { Empty } from 'antd';
import { t } from 'i18next';

export default function NoData() {
    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <Empty
                description={t('common.empty.Description')}
            />
        </div>
    );
}
