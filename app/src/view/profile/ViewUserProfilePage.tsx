import { Col, Row } from 'antd';
import ProfileUserCard from './ProfileUserCard';

export default function ViewUserProfilePage() {
    return (
        <Row gutter={[24,24]}>
            <Col
                xxl={8}
            >
                <ProfileUserCard/>
            </Col>
        </Row>
    );
}