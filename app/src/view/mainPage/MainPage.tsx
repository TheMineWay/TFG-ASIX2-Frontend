
import { Col, Row } from 'antd';
import AnnouncesCarousel from './anouncesCarousel/AnnouncesCarousel';
import ViewPublicOpinions from './opinions/ViewPublicOpinions';
import OurProfessionalsCardGrid from './ourProfessionals/OurProfessionalsCardGrid';

const sections: JSX.Element[] = [
    <AnnouncesCarousel />,
    <ViewPublicOpinions />,
    <OurProfessionalsCardGrid />,
];

export default function MainPage() {
    return (
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
    );
}