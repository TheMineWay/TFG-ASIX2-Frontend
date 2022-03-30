import { Modal } from 'antd';
import React from 'react'
import AvatarEditorForm from './AvatarEditorForm';

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function AvatarEditorModal(props: Props) {
    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
            closable={false}
        >
            <AvatarEditorForm/>
        </Modal>
    );
}