import { Button, Form, Input } from 'antd';

type Props = {
    text: string;
    submit: () => void;
    loading?: boolean;
}

export default function SubmitFormItem(props: Props) {
    return (
        <Button
            type='primary'
            onClick={props.submit}
            loading={props.loading}
        >{props.text}</Button>
    );
}