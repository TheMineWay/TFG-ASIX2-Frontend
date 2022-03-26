import { Col, Row } from 'antd';
import useUserState from '../../hooks/user/useUserState';
import Loading from '../shared/Loading';
import UserAvatar from '../shared/UserAvatar';
import ProfileUserCard from './ProfileUserCard';

export default function ViewUserProfilePage() {
    const [userState] = useUserState();

    console.log(userState);

    if (!userState) return <Loading/>;

    const getFullName = (): string => {
        return userState!.name + (userState!.lastName ? " " + userState!.lastName : '');
    }

    return (
        <Row gutter={[24,24]}>
            <Col span={24} style={{textAlign: 'center'}}>
                <UserAvatar size={128}/>
                <h2>{getFullName()}</h2>
            </Col>
            <Col
                xxl={8}
            >
                <ProfileUserCard/>
            </Col>
        </Row>
    );
}