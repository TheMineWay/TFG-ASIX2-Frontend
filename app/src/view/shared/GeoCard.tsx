import { Card, List } from "antd";
import { GeoLocation } from "../../hooks/geolocation/useGeolocation";
import { Marker, ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useTranslation } from 'react-i18next';

const { Item } = List;

type Props = {
    includeCard?: boolean;
    geolocation: GeoLocation;
    width?: string | number;
}

export default function GeoCard(props: Props) {

    const { t, i18n } = useTranslation();

    const GeoInfo = () => (
        <List style={{ width: props.width }}>
            <Item>
                <Item.Meta
                    title={[
                        props.geolocation.continent,
                        props.geolocation.country,
                        props.geolocation.city ?? props.geolocation.province,
                    ].join(', ')}
                />
            </Item>
            <Item>
                <Item.Meta
                    title={t('common.other.Timezone')}
                    description={props.geolocation.timezone}
                />
            </Item>
            <Item>
                <ComposableMap style={{ width: '100%' }}>
                    <ZoomableGroup zoom={2}>
                        <Geographies geography='https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'>
                            {({ geographies }) =>
                                geographies.map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#DDD"
                                        stroke="#FFF"
                                    />
                                ))
                            }
                        </Geographies>
                        <Marker
                            coordinates={[props.geolocation.longitude, props.geolocation.latitude]}
                        >
                            <circle r={2} fill="#F53" />
                        </Marker>
                    </ZoomableGroup>
                </ComposableMap>
            </Item>
        </List>
    );

    return (
        <>
            {
                props.includeCard ? (<Card><GeoInfo /></Card>) : (<GeoInfo />)
            }
        </>
    );
}
