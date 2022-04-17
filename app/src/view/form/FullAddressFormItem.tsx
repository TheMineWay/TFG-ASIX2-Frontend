import { City, Country } from "country-state-city";
import { ICity, ICountry } from "country-state-city/dist/lib/interface";
import { useState } from "react";
import SingleSelectFormItem from "./SingleSelectFormItem";

type Props = {
    countryFieldName: string;
    countryLabel: string;
    cityFieldName: string;
    cityLabel: string;
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

    return (
        <>
            <SingleSelectFormItem
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

            <SingleSelectFormItem
                showSearch
                name={props.cityFieldName}
                label={props.cityLabel}
                options={cities.map((c) => ({
                    key: c.name,
                    title: <>{c.name}</>
                }))}
            />
        </>
    );
}