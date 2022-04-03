import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import PreviewImage from '../shared/PreviewImage';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    icon?: JSX.Element | null;
    min?: number;
    max?: number;
    showCount?: boolean;
}

export default function ImageByUrlFormItem(props: Props) {

    const [url, setUrl] = useState<string>();
    const [preview, setPreview] = useState<boolean>(false);

    return (
        <>
            <Modal
                visible={preview}
                onCancel={() => setPreview(false)}
                footer={null}
            >
                <PreviewImage src={url ?? ""}/>
            </Modal>
            <Form.Item name={props.name} label={props.label} required={props.required && !props.requiredInvisibility}>
                <Input
                    showCount={props.showCount}
                    prefix={props.icon !== null && (props.icon ?? <LinkOutlined />)}
                    type='url'
                    required={props.required}
                    minLength={props.min}
                    maxLength={props.max}
                    onChange={(v) => setUrl(v.target.value)}
                    addonAfter={<EyeOutlined disabled={!url} onClick={() => setPreview(true)} />}
                />
            </Form.Item>
        </>
    );
}