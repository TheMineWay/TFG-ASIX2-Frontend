
import { Col, Row } from 'antd';
import Container from '../shared/Container';
import AnnouncesCarousel from './anouncesCarousel/AnnouncesCarousel';
import ViewPublicOpinions from './opinions/ViewPublicOpinions';
import OurProfessionalsCardGrid from './ourProfessionals/OurProfessionalsCardGrid';
import WeOfferView from './weOffer/WeOfferView';

const sections: JSX.Element[] = [
    <AnnouncesCarousel />,
    <ViewPublicOpinions />,
    <WeOfferView/>,
    <OurProfessionalsCardGrid />,
];

export default function MainPage() {
    return (
        <Container>
            <Row
            gutter={[24, 48]}
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
        </Container>
    );
}