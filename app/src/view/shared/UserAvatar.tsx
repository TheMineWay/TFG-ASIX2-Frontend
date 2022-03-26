import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import useUserState from '../../hooks/user/useUserState';

type Props = {
    size?: number;
}

export default function UserAvatar(props: Props) {
    const [userState] = useUserState();

    return (
        <Avatar
            icon={<UserOutlined/>}
            size={props.size}
        />
    );
}