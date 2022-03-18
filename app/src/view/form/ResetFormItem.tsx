import { Button } from 'antd';
import { t } from 'i18next';

type Props = {}

export default function ResetFormItem(props: Props) {
    return (
        <Button
            htmlType='reset'
        >{t('common.actions.Reset')}</Button>
    );
}