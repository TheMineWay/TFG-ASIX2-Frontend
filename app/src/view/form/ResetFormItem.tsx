import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from 'i18next';

type Props = {
    block?: boolean;
}

export default function ResetFormItem(props: Props) {
    return (
        <Button
            icon={<RedoOutlined/>}
            htmlType='reset'
            block={props.block}
        >{t('common.actions.Reset')}</Button>
    );
}