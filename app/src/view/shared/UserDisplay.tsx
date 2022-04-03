import { Tooltip } from "antd";
import { UseUsers } from "../../hooks/user/useUsers";

type Props = {
    id: string;
    users: UseUsers;
}

export default function UserDisplay(props: Props) {

    const user = props.users.getById(props.id);

    return (
        <Tooltip
            title={`Name: ${user?.name}`}
        >
            {props.id}
        </Tooltip>
    );
}