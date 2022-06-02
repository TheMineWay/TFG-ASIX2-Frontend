import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { getBaseUrl } from '../../conf/conf';
import useUserState from '../../hooks/user/useUserState';

type Props = {
    size?: number;
}

export default function UserAvatar(props: Props) {
    const [userState] = useUserState();

    return (
        <Avatar
            src={getBaseUrl() + "/uploads/avatars/" + userState?.id}
            icon={<UserOutlined/>}
            size={props.size}
        />
    );
}