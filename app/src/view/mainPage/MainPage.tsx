
import { Col, Row } from 'antd';
import AnnouncesCarousel from './anouncesCarousel/AnnouncesCarousel';
import ViewPublicOpinions from './opinions/ViewPublicOpinions';

const sections: JSX.Element[] = [
    <AnnouncesCarousel />,
    <ViewPublicOpinions />,
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