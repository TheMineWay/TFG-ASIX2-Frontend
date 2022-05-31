import { SaveOutlined } from '@ant-design/icons'
import { Col, Form, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { isPhoneNumber } from 'class-validator';
import { t } from 'i18next';
import moment from 'moment';
import useUserProfile from '../../../hooks/user/useUserProfile';
import { UserModel } from '../../../services/auth/User.model'
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import DateFormItem from '../../form/DateFormItem';
import EmailFormItem from '../../form/EmailFormItem'
import PhoneFormItem from '../../form/PhoneFormItem'
import ResetFormItem from '../../form/ResetFormItem'
import SubmitFormItem from '../../form/SubmitFormItem'
import TextFormItem from '../../form/TextFormItem'
import UsernameFormItem from '../../form/UsernameFormItem';

export type UserEditFormValues = {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    login: string;
    birthdate: Date;
}

export default function ProfileEditorForm() {

    const userProfile = useUserProfile();

    const [form] = useForm<UserEditFormValues>();

    const submit = async (values: UserEditFormValues): Promise<void> => {
        try {
            if(!isPhoneNumber(values.phone)) {
                throw {
                    section: 'frontend',
                    code: '406'
                };
            }
            await userProfile.update(values);
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    return (
        <>
            <Form
                layout='vertical'
                form={form}
                initialValues={userProfile.userState}
                onFinish={submit}
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
                <UsernameFormItem
                    name='login'
                />
                <DateFormItem
                    name='birthdate'
                    label={t('common.form.Birthdate')}
                    max={moment().subtract(14, 'years').toDate()}
                    min={moment().subtract(130, 'years').toDate()}
                />

                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        <SubmitFormItem
                            loading={userProfile.loading}
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