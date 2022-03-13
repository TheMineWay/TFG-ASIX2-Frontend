import { t } from 'i18next';
import PasswordStrengthBar from 'react-password-strength-bar';

type Props = {
    password: string;
}

export default function PasswordStrengthIndicator(props: Props) {
    return (
        <PasswordStrengthBar
            password={props.password}
            shortScoreWord={t('common.form.password.TooShort')}
            scoreWords={[
                t('common.form.password.TooWeak'),
                t('common.form.password.Weak'),
                t('common.form.password.Okay'),
                t('common.form.password.Good'),
                t('common.form.password.Strong')
            ]}
        />
    );
}