import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react'
import AvatarFormItem from '../../form/AvatarFormItem';

export default function AvatarEditorForm() {

    const [form] = useForm();

    const submit = async (values: any): Promise<void> => {
        console.log(values);
    }

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={submit}
        >
            <AvatarFormItem
                name='avatar'
                url='/actions/me/uploadAvatar'
            />
        </Form>
    );
}