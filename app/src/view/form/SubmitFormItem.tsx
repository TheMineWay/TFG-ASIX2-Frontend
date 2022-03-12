import { Button, Form, Input } from 'antd';

type Props = {
    text: string;
    submit: () => void;
}

export default function SubmitFormItem(props: Props) {
    return (
        <Button
            type='primary'
            onClick={props.submit}    
        >{props.text}</Button>
    );
}