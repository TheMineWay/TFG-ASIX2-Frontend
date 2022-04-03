import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Tooltip } from "antd";
import { UseUsers } from "../../hooks/user/useUsers";

type Props = {
    id: string;
    users: UseUsers;
}

export default function UserDisplay(props: Props) {

    const user = props.users.getById(props.id);

    return (
        <Tooltip
            color='white'
            title={(
                <List
                    itemLayout='horizontal'
                    style={{width: 350}}
                >
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined/>}/>}
                            title={`${user?.name} ${user?.lastName}`}
                            description={`${user?.email} - ${user?.login}`}
                        />
                    </List.Item>
                </List>
            )}
        >
            {props.id}
        </Tooltip>
    );
}