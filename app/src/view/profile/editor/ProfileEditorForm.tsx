import { SaveOutlined } from '@ant-design/icons'
import { Col, Form, Row, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { t } from 'i18next'
import React from 'react'
import { UserModel } from '../../../services/auth/User.model'
import EmailFormItem from '../../form/EmailFormItem'
import PhoneFormItem from '../../form/PhoneFormItem'
import ResetFormItem from '../../form/ResetFormItem'
import SubmitFormItem from '../../form/SubmitFormItem'
import TextFormItem from '../../form/TextFormItem'

export default function ProfileEditorForm() {

    const [form] = useForm<UserModel>();

    return (
        <>
            <Form
                layout='vertical'
                form={form}
            >
                <TextFormItem
                    name='name'
                    label={t('common.form.Name')}
                    min={1}
                    max={32}
                />
                <TextFormItem
                    name='lastName'
                    label={t('common.form.LastName')}
                    min={1}
                    max={32}
                />
                <PhoneFormItem
                    name='phone'
                />
                <EmailFormItem
                    name='email'
                />

                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <SubmitFormItem
                            icon={<SaveOutlined />}
                            text={t('common.actions.Save')}
                            block
                        />
                    </Col>
                    <Col span={12}>
                        <ResetFormItem
                            block
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}