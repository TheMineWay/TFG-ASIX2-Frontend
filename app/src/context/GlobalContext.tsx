import AuthContext from './AuthContext';

type Props = {
    children: JSX.Element;
}

export default function GlobalContext(props: Props) {

    return (
        <AuthContext>
            {props.children}
        </AuthContext>
    )
}