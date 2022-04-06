import { Col as AntCol, Row } from 'antd';
import useUserState from '../../hooks/user/useUserState';
import Loading from '../shared/Loading';
import UserAvatar from '../shared/UserAvatar';
import ProfileUserCard from './ProfileUserCard';
import SessionsHistoryProfileCard from './SessionsHistoryProfileCard';

export default function ViewUserProfilePage() {
    const [userState] = useUserState();

    if (!userState) return <Loading />;

    const getFullName = (): string => {
        return userState!.name + (userState!.lastName ? " " + userState!.lastName : '');
    };

    const Col = (props: { children: JSX.Element | JSX.Element[] }) => (
        <AntCol
            xxl={10}
            xs={24}
            md={20}
            lg={16}
            xl={12}
        >
            {props.children}
        </AntCol>
    );

    const Body = () => (
        <Row gutter={[24, 24]}>
            {
                [
                    <ProfileUserCard />,
                    <SessionsHistoryProfileCard />,
                ].map((c) => (
                    <AntCol span={24}>{c}</AntCol>
                ))
            }
        </Row>
    );

    return (
        <Row gutter={[24, 24]}>
            <AntCol span={24} style={{ textAlign: 'center' }}>
                <UserAvatar size={128} />
                <h2>{getFullName()}</h2>
            </AntCol>
            <AntCol
                span={24}
            >
                <Row
                    gutter={[24, 24]}
                    justify='center'
                >
                    <Col>
                        <Body />
                    </Col>
                </Row>
            </AntCol>
        </Row>
    );
}