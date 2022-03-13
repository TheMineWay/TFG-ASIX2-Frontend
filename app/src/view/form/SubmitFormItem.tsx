import { Button, Form, Input } from 'antd';

type Props = {
    text: string;
    loading?: boolean;
}

export default function SubmitFormItem(props: Props) {
    return (
        <Button
            type='primary'
            htmlType='submit'
            loading={props.loading}
        >{props.text}</Button>
    );
}