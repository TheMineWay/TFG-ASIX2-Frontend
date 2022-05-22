import { Modal } from 'antd';
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

    if(!authState?.session) return <Loading/>;

    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
            closable={false}
        >
            <iframe
                src={getBaseUrl() + `/actions/me/uploadAvatarForm.php?&session=${authState?.session}`}
            />
        </Modal>
    );
}