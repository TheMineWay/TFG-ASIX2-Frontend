import { Modal } from 'antd'
import { t } from 'i18next';
import React from 'react'

type Props = {
    visible: 'login' | 'register' | null;
    hide: () => void;
}

export default function LoginModal(props: Props) {
    return (
        <>
            <Modal
                visible={props.visible === 'login'}
                onCancel={props.hide}
                title={t('view.login.Title')}
            >

            </Modal>
            <Modal
                visible={props.visible === 'register'}
                onCancel={props.hide}
                title={t('view.signup.Title')}
            >

            </Modal>
        </>
    )
}