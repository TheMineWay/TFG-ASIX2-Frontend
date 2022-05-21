import { Tag } from "antd";

type Props = {
    name?: string;
}

export default function RoleTag(props: Props) {
    return (
        <Tag>
            {props.name ?? 'User'}
        </Tag>
    );
}