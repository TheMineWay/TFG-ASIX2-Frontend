import { Card, List } from "antd";
import { GeoLocation } from "../../hooks/geolocation/useGeolocation";

const { Item } = List;

type Props = {
    includeCard?: boolean;
    geolocation: GeoLocation;
    width?: string | number;
}

export default function GeoCard(props: Props) {
    const GeoInfo = () => (
        <List style={{width: props.width}}>
            <Item>
                <Item.Meta
                    title={props.geolocation.country}
                />
            </Item>
        </List>
    );

    return props.includeCard ? (<Card><GeoInfo /></Card>) : (<GeoInfo />);
}
