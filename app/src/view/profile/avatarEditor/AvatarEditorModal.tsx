import { Alert, Modal } from 'antd';
import { t } from 'i18next';
import React from 'react'
import { getBaseUrl } from '../../../conf/conf';
import useAuthState from '../../../hooks/auth/useAuthState';
import Loading from '../../shared/Loading';
import AvatarEditorForm from './AvatarEditorForm';

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function AvatarEditorModal(props: Props) {

    const [authState] = useAuthState();

    if (!authState?.session) return <Loading />;

    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
            onOk={props.hide}
            closable={false}
        >
            <Alert
                type='warning'
                showIcon
                message={(
                    <>
                        <b>{t('warnings.cors.Title')}</b>
                        <p>{t('warnings.cors.Message')}</p>
                    </>
                )}
            />
            <br />
            <iframe
                style={{
                    width: '100%'
                }}
                src={getBaseUrl() + `/actions/me/uploadAvatarForm.php?&session=${authState?.session}`}
            />
        </Modal>
    );
}