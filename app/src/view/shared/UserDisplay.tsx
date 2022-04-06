import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Tooltip } from "antd";
import { UseUsers } from "../../hooks/user/useUsers";
import { UserModel } from "../../services/auth/User.model";

type Props = {
    id: string;
    users: UseUsers;
}

export default function UserDisplay(props: Props) {

    const user = props.users.getById(props.id);

    return (
        <Tooltip
            color='white'
            title={user ? (
                    <List
                        itemLayout='horizontal'
                        style={{width: 350}}
                    >
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined/>}/>}
                                title={`${user?.name} ${user?.lastName}`}
                                description={`${user?.email}`}
                            />
                        </List.Item>
                    </List>
                ) : (
                    <></>
                )
            }
        >
            {user?.login ?? props.id}
        </Tooltip>
    );
}