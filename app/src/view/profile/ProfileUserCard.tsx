import { EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import ProfileEditorDrawer from './editor/ProfileEditorDrawer';

export default function ProfileUserCard() {

    const [isEditing, setEdit] = useState<boolean>(false);

    const EditButton = (): JSX.Element => (
        <Button icon={<EditOutlined />} type='primary' onClick={() => setEdit(true)}>
            {t('common.actions.Edit')}
        </Button>
    );

    return (
        <>
            <ProfileEditorDrawer
                visible={isEditing}
                setVisibility={setEdit}
            />

            <Card
                extra={<EditButton />}
            >

            </Card>
        </>
    );
}