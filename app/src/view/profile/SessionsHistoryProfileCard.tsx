import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ImageSidedCard from '../shared/ImageSidedCard';

export default function SessionsHistoryProfileCard() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <ImageSidedCard
            src={require('../../resources/profile/timeline/Timeline.png')}
            hoverable
            preview={false}
            actions={[
                <Button
                    type='primary'
                    onClick={() => navigate('/user/session-history')}
                >
                    {t('view.profile.sessionHistory.card.actions.Go')}
                </Button>
            ]}
        >
            <p
                style={{textAlign: 'justify'}}
            >{t('view.profile.sessionHistory.card.Message')}</p>
        </ImageSidedCard>
    );
}