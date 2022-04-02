import AuthContext from './AuthContext';
import LanguageContext from './LanguageContext';
import UserContext from './UserContext';

type Props = {
    children: JSX.Element;
}

export default function GlobalContext(props: Props) {
    return (
        <LanguageContext>
            <AuthContext>
                <UserContext>
                    {props.children}
                </UserContext>
            </AuthContext>
        </LanguageContext>
    )
}