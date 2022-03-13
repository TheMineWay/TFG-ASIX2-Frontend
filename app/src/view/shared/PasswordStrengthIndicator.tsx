import { Progress } from 'antd';
import passwordStrengthCheck from '../../services/password/passwordStrengthCheck';

type Props = {
    password: string;
}

export default function PasswordStrengthIndicator(props: Props) {
    const evaluation = passwordStrengthCheck(props.password);

    return (
        <Progress
            strokeColor={evaluation.state}
            percent={evaluation.strength}
            showInfo={false}
        />
    );
}