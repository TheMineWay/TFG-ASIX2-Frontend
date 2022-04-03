import { Popconfirm as AntPopconfirm } from 'antd';

type Props = {
    children: JSX.Element;
    title: string;
    onOk?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
}

export default function Popconfirm(props: Props) {
    return (
        <AntPopconfirm
            title={props.title}
            onConfirm={props.onOk}
            onCancel={props.onCancel}
        >
            {props.children}
        </AntPopconfirm>
    );
}