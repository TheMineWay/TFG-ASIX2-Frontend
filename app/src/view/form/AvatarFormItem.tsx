import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { useState } from 'react';
import useAuthState from '../../hooks/auth/useAuthState';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../errors/display/NotificationErrorDisplay';

type Props = {
    name: string;
}

export default function AvatarFormItem(props: Props) {

    const [authState] = useAuthState();

    const [imageUrl, setImageUrl] = useState<string>();
    const loading = false;

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notificationErrorDisplay({
                section: 'frontend',
                code: 'image-not-png'
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notificationErrorDisplay({
                section: 'frontend',
                code: 'image-size-exceeded'
            });
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = (data: UploadChangeParam): void => {
        console.log(data);
    }

    const submit = async (values: any): Promise<void> => {
        await request('post', '/me/updateAvatar', {
            file: values
        }, {
            authCredentials: authState,
        });
    }

    return (
        <Form.Item
            name={props.name}
        >
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={submit}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Form.Item>
    );
}