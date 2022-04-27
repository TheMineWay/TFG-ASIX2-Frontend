import { Col as AntCol, Row } from "antd";
import { City, Country } from "country-state-city";
import { ICity, ICountry } from "country-state-city/dist/lib/interface";
import { useState } from "react";
import SingleSelectFormItem from "./SingleSelectFormItem";
import TextFormItem from "./TextFormItem";

type Props = {
    countryFieldName: string;
    countryLabel: string;
    cityFieldName: string;
    cityLabel: string;
    postalCodeFieldName: string;
    postalCodeLabel: string;
    addressFieldName: string;
    addressLabel: string;
}

export default function FullAddressFormItem(props: Props) {

    const countries: ICountry[] = Country.getAllCountries();
    const [selectedCountry, setSelectedCountry] = useState<string>();

    const lidf: string[] = ['Pisos picados', 'Balsa botín', 'Cactus colosales', 'Paraíso pesquero', 'Molins de rei', 'Faro de lockie', 'Dunas derrapantes'];

    const cities: ICity[] = selectedCountry ? (selectedCountry === 'LIDF' ? lidf.map((c) => ({
        countryCode: 'LIDF',
        name: c,
        stateCode: 'LIDF'
    })) : City.getCitiesOfCountry(selectedCountry)!) : [];

    const Col = (props: { children: JSX.Element }) => {
        return (
            <AntCol
                xs={24}
                md={12}
            >
                {props.children}
            </AntCol>
        );
    }

    return (
        <Row
            gutter={[24, 24]}
        >
            <Col>
                <SingleSelectFormItem
                    required requiredInvisibility
                    showSearch
                    name={props.countryFieldName}
                    label={props.countryLabel}
                    options={[
                        ...countries.map((c) => ({
                            key: c.isoCode,
                            title: <>{c.flag} {c.name}</>,
                        })),
                        ...[
                            {
                                key: 'LIDF',
                                title: <>🏝 La isla del Fortnite</>
                            }
                        ]
                    ]}
                    onSelect={setSelectedCountry}
                />
            </Col>

            <Col>
                <SingleSelectFormItem
                    required requiredInvisibility
                    showSearch
                    name={props.cityFieldName}
                    label={props.cityLabel}
                    options={cities.map((c) => ({
                        key: c.name,
                        title: <>{c.name}</>
                    }))}
                    disabled={!selectedCountry}
                />
            </Col>

            <Col>
                <TextFormItem
                    required requiredInvisibility
                    name={props.addressFieldName}
                    label={props.addressLabel}
                    min={1} max={200}
                />
            </Col>

            <Col>
                <TextFormItem
                    required requiredInvisibility
                    min={5}
                    max={5}
                    name={props.postalCodeFieldName}
                    label={props.postalCodeLabel}
                />
            </Col>
        </Row>
    );
}