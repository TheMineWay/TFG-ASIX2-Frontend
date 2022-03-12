import { Button } from 'antd';
import { t } from 'i18next';

type Props = {
    onReset: () => void;
}

export default function ResetFormItem(props: Props) {
    return (
        <Button
            onClick={props.onReset}
        >{t('common.actions.Reset')}</Button>
    );
}