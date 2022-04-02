import { Button, Form, Input } from 'antd';

type Props = {
    text: string;
    loading?: boolean;
    block?: boolean;
    icon?: JSX.Element;
}

export default function SubmitFormItem(props: Props) {
    return (
        <Button
            type='primary'
            htmlType='submit'
            loading={props.loading}
            block={props.block}
            icon={props.icon}
        >{props.text}</Button>
    );
}