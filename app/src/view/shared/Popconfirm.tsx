import { Popconfirm as AntPopconfirm } from 'antd';

type Props = {
    children: JSX.Element;
    title: string;
    onOk?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    disabled?: boolean;
}

export default function Popconfirm(props: Props) {
    return (
        <AntPopconfirm
            disabled={props.disabled}
            title={props.title}
            onConfirm={props.onOk}
            onCancel={props.onCancel}
        >
            {props.children}
        </AntPopconfirm>
    );
}