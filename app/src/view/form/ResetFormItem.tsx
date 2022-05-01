import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
    block?: boolean;
}

export default function ResetFormItem(props: Props) {

    const { t } = useTranslation();

    return (
        <Button
            icon={<RedoOutlined/>}
            htmlType='reset'
            block={props.block}
        >{t('common.actions.Reset')}</Button>
    );
}