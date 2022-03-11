import { Modal } from 'antd'
import React from 'react'

type Props = {
    visible: boolean;
    hide: () => void;
}

export default function LoginModal(props: Props) {
    return (
        <Modal
            visible={props.visible}
            onCancel={props.hide}
        >
            
        </Modal>
    )
}