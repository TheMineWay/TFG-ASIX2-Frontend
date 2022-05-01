import { EditOutlined, FileImageOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarEditorModal from './avatarEditor/AvatarEditorModal';
import ProfileEditorDrawer from './editor/ProfileEditorDrawer';
import PasswordEditModal from './passwordEditor/PasswordEditModal';

export default function ProfileUserCard() {

    const { t } = useTranslation();

    const [isEditing, setEdit] = useState<null | 'profile' | 'password' | 'avatar'>(null);

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

    const ProfileImageEditButton = (): JSX.Element => (
        <Button
            type='primary'
            icon={<FileImageOutlined />}
            onClick={() => setEdit('avatar')}
        >
            {t('common.actions.ChangeProfileImage')}
        </Button>
    );

    const EditPasswordButton = (): JSX.Element => (
        <Button
            type='primary'
            icon={<KeyOutlined />}
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

            <AvatarEditorModal
                visible={isEditing === 'avatar'}
                hide={hide}
            />

            <Card>
                <Space>
                    <EditPasswordButton />
                    <EditButton />
                    <ProfileImageEditButton />
                </Space>
            </Card>
        </>
    );
}