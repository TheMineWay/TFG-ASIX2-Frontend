import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { t } from 'i18next';

type Props = {
    name: string;
}

export default function UsernameFormItem(props: Props) {
    const placeholderUsernames: string[] = ['john', 'toni'];

    return (
        <Form.Item name={props.name} label={t('common.form.Username')}>
            <Input prefix={<UserOutlined/>} type='text' placeholder={placeholderUsernames[Math.floor(Math.random() * placeholderUsernames.length)]}/>
        </Form.Item>
    );
}