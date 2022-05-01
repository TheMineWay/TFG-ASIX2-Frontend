import { IdcardOutlined, SaveOutlined } from '@ant-design/icons';
import { Divider, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useTranslation } from 'react-i18next';
import { UserAdmin } from '../../../hooks/user/useUserAdmin';
import { UserModel } from '../../../services/auth/User.model';
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import DateFormItem from '../../form/DateFormItem';
import DrawerFormActions from '../../form/DrawerFormActions';
import EmailFormItem from '../../form/EmailFormItem';
import PasswordFormItem from '../../form/PasswordFormItem';
import PhoneFormItem from '../../form/PhoneFormItem';
import SubmitFormItem from '../../form/SubmitFormItem';
import TextFormItem from '../../form/TextFormItem';
import UsernameFormItem from '../../form/UsernameFormItem';

type Props = {
    userAdmin: UserAdmin;
    user: UserModel;
    hide: () => void;
}

export type AdminUserEditValues = {
    name: string;
    lastName: string;
    birthdate: Date;
    password?: string;
    phone: string;
    email: string;
    login: string;
}

export default function AdminUserProfileEditorForm(props: Props) {

    const { t } = useTranslation();

    const user = props.user;

    const [form] = useForm();

    const submit = async (values: AdminUserEditValues): Promise<void> => {
        try {
            await props.userAdmin.updateUser(user.id, {
                ...values,
                password: values.password ?? undefined
            });
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
    }

    return (
        <Form
            form={form}
            initialValues={user}
            layout='vertical'
            onFinish={submit}
        >
            <UsernameFormItem
                name='login'
            />
            <TextFormItem
                icon={<IdcardOutlined />}
                name='name'
                label={t('common.form.Name')}
                required requiredInvisibility
                min={1}
                max={32}
            />
            <TextFormItem
                icon={<IdcardOutlined />}
                name='lastName'
                label={t('common.form.LastName')}
                required requiredInvisibility
                min={1}
                max={32}
            />
            <EmailFormItem
                name='email'
                required requiredInvisibility
            />
            <PhoneFormItem
                name='phone'
                required requiredInvisibility
            />
            <DateFormItem
                name='birthdate'
                label={t('common.form.Birthdate')}
                required requiredInvisibility
            />

            <Divider/>

            <PasswordFormItem
                name='password'
                showStrenght
            />
            <br/>

            <DrawerFormActions
                submit={<SubmitFormItem
                    block
                    text={t('common.actions.Save')}
                    icon={<SaveOutlined/>}
                    loading={props.userAdmin.loading}
                />}
            />
        </Form>
    );
}
