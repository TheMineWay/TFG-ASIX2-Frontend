import moment from "moment";

type Props = {
    children: Date;
}

export default function DateDisplay(props: Props) {
    return (
        <>{moment(props.children).toString()}</>
    );
}