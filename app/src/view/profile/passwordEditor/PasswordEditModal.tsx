import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import PasswordEditForm from './PasswordEditForm';

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function PasswordEditModal(props: Props) {
    const { t } = useTranslation();

    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
            closable={false}
            footer={[
                <Button
                    onClick={props.hide}
                >
                    {t('common.actions.Exit')}
                </Button>
            ]}
            destroyOnClose
        >
            <PasswordEditForm
                hide={props.hide}
            />
        </Modal>
    );
}