import { EditOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import ProfileEditorDrawer from './editor/ProfileEditorDrawer';
import PasswordEditModal from './passwordEditor/PasswordEditModal';

export default function ProfileUserCard() {

    const [isEditing, setEdit] = useState<null | 'profile' | 'password'>(null);

    const hide = (): void => {
        setEdit(null);
    }

    const EditButton = (): JSX.Element => (
        <Button
            icon={<EditOutlined />}
            type='primary'
            onClick={() => setEdit('profile')}
        >
            {t('common.actions.Edit')}
        </Button>
    );

    const EditPasswordButton = (): JSX.Element => (
        <Button
            type='primary'
            icon={<KeyOutlined/>}
            onClick={() => setEdit('password')}
        >
            {t('common.actions.ChangePassword')}
        </Button>
    );

    return (
        <>
            <ProfileEditorDrawer
                visible={isEditing === 'profile'}
                hide={hide}
            />

            <PasswordEditModal
                visible={isEditing === 'password'}
                hide={hide}
            />

            <Card>
                <Space>
                    <EditPasswordButton />
                    <EditButton />
                </Space>
            </Card>
        </>
    );
}