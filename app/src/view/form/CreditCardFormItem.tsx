import TextFormItem from './TextFormItem';

type Props = {
    name: string;
    required?: boolean;
    requiredInvisibility?: boolean;
    label: string;
    icon?: JSX.Element;
}

export default function CreditCardFormItem(props: Props) {
    return (
        <TextFormItem
            name={props.name}
            label={props.label}
            icon={props.icon}
            min={16}
            max={16}
        />
    );
}