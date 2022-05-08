
import { Col, Row } from 'antd';
import AnnouncesCarousel from './anouncesCarousel/AnnouncesCarousel';
import ViewPublicOpinions from './opinions/ViewPublicOpinions';
import OurProfessionalsCardGrid from './ourProfessionals/OurProfessionalsCardGrid';
import WeOfferView from './weOffer/WeOfferView';

const sections: JSX.Element[] = [
    <AnnouncesCarousel />,
    <WeOfferView />,
    <OurProfessionalsCardGrid />,
    <ViewPublicOpinions />,
];

export default function MainPage() {
    return (
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
    );
}