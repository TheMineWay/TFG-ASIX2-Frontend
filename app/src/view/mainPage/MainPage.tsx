
import { BackTop, Col, Row } from 'antd';
import ContactFormWithBrand from './ContactForm/ContactFormWithBrand';
import AnnouncesCarousel from './anouncesCarousel/AnnouncesCarousel';
import ViewPublicOpinions from './opinions/ViewPublicOpinions';
import OurProfessionalsCardGrid from './ourProfessionals/OurProfessionalsCardGrid';
import WeOfferView from './weOffer/WeOfferView';
import Customers from './customers/Customers';
import { useParams } from 'react-router-dom';
import RecoverPasswordModal from '../auth/RecoverPasswordModal';

const sections: JSX.Element[] = [
    <AnnouncesCarousel />,
    <WeOfferView />,
    <OurProfessionalsCardGrid />,
    <ContactFormWithBrand/>,
    <ViewPublicOpinions />,
    <Customers/>,
];

export default function MainPage() {

    const { token } = useParams();

    return (
        <>
            <RecoverPasswordModal
                token={token}
            />
            <BackTop/>
            <Row
                justify='center'
            >
                <Col
                    xs={24}
                    lg={23}
                    xl={22}
                >
                    <Row
                        gutter={[24, 48]}
                        justify='center'
                    >
                        {
                            sections.map((section) => (
                                <Col
                                    span={24}
                                >
                                    {
                                        section
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </>
    );
}