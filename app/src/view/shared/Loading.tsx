import { Spin } from 'antd';

type Props = {
    size?: 'small' | 'default' | 'large';
}

export default function Loading(props: Props) {
    return (
        <Spin
            size={props.size}
        />
    );
}