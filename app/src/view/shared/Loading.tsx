import { Spin } from 'antd';

type Props = {
    size?: 'small' | 'default' | 'large';
}

export default function Loading(props: Props) {
    return (
        <div
            style={{
                width: '100%',
                textAlign: 'center',
            }}
        >
            <Spin
                size={props.size}
            />
        </div>
    );
}