import { Image } from "antd";

type Props = {
    src: string;
}

export default function PreviewImage(props: Props) {
    return (
        <Image
            src={props.src}
        />
    );
}