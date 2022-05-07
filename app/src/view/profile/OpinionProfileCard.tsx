import { Card, notification, Skeleton } from 'antd';
import useAuthState from '../../hooks/auth/useAuthState';
import useMyOpinion from '../../hooks/opinions/useMyOpinion';
import OpinionForm from '../layout/opinions/OpinionForm';

export default function OpinionProfileCard() {

    const [authState] = useAuthState();
    const { opinion, loading } = useMyOpinion();

    return (
        <Card
            hoverable
            loading={loading}
            onMouseEnter={() => notification.close('opinion-notification')}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
            <OpinionForm
                authState={authState}
                defaultValues={opinion ?? undefined}
                center
            />
            </div>
        </Card>
    );
}