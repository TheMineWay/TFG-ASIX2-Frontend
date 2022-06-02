import { Col, Row } from "antd";
import { t } from "i18next";
import SectionTitle from "../../shared/SectionTitle";

type Customer = {
    logo: string;
    link: string;
    name: string;
}

const customers: Customer[] = [
    {
        logo: require('../../../resources/mainPage/customers/aperture-laboratories.png'),
        link: 'https://theportalwiki.com/wiki/Main_Page',
        name: 'Aperture Laboratories',
    },
    {
        logo: require('../../../resources/mainPage/customers/nft-seekers.png'),
        link: 'http://seekersnft.000webhostapp.com/',
        name: 'NFT Seekers',
    },
];

export default function Customers() {
    return (
        <Row
            justify="center"
            gutter={[48, 48]}
        >
            <Col span={24}>
                <SectionTitle>{t('view.mainPage.sections.customers.Title')}</SectionTitle>
            </Col>
            {
                customers.map((customer) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={8}
                        xl={6}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            alt={customer.name}
                            src={customer.logo}
                            style={{
                                width: '100%',
                            }}
                            onClick={() => {
                                window.open(customer.link, '_blank')?.focus();
                            }}
                        />
                    </Col>
                ))
            }
        </Row>
    );
}