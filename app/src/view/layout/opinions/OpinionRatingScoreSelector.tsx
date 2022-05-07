import { Rate } from "antd";
import { useState } from "react";

type Props = {
    onChange?: (v: number) => void;
    defaultValue?: number;
}

export default function OpinionRatingScoreSelector(props: Props) {

    const [state, setState] = useState<number>(props.defaultValue ?? 0);

    return (
        <Rate
            defaultValue={0}
            onChange={(v) => {
                setState(v);
                props.onChange && props.onChange(v);
            }}
            value={state}
            allowClear={false}
        />
    );
}