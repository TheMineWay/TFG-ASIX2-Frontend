type Props = {
    children: JSX.Element;
}

export default function SectionTitle(props: Props) {
    return (
        <h1
            style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
            }}
        >{props.children}</h1>
    );
}