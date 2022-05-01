import { SaveOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useTranslation } from 'react-i18next';
import useAuthState from '../../../hooks/auth/useAuthState';
import AuthService from '../../../services/auth/AuthService';
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import PasswordFormItem from '../../form/PasswordFormItem';
import ResetFormItem from '../../form/ResetFormItem';
import SubmitFormItem from '../../form/SubmitFormItem';

type PasswordEditFormValues = {
    oldPassword: string;
    newPassword: string;
    newPasswordAgain: string;
}

type Props = {
    hide: () => void;
}

export default function PasswordEditForm(props: Props) {

    const { t } = useTranslation();

    const [form] = useForm<PasswordEditFormValues>();
    const [ authState ] = useAuthState();

    const submit = async (values: PasswordEditFormValues): Promise<void> => {
        try {
            if(values.newPassword !== values.newPasswordAgain) {
                throw {
                    code: 'passwords-no-match',
                    section: 'form',
                };
            }

            await AuthService.updatePassword({
                old: values.oldPassword,
                new: values.newPassword,
            }, authState);

            props.hide();
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
    }

    return (
        <Form
            form={form}
            onFinish={submit}
            layout='vertical'
        >
            <PasswordFormItem
                name='oldPassword'
                label={t('view.profile.editPassword.form.OldPassword')}
            />
            <PasswordFormItem
                name='newPassword'
                showStrenght
                label={t('view.profile.editPassword.form.NewPassword')}
            />
            <PasswordFormItem
                name='newPasswordAgain'
                label={t('view.profile.editPassword.form.NewPasswordAgain')}
            />

            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <SubmitFormItem
                        text={t('view.profile.editPassword.form.UpdatePassword')}
                        icon={<SaveOutlined/>}
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
    );
}