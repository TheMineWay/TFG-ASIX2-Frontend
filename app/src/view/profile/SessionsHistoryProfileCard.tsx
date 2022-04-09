import { Button } from 'antd';
import { t } from 'i18next';
import ImageSidedCard from '../shared/ImageSidedCard';

export default function SessionsHistoryProfileCard() {
    return (
        <ImageSidedCard
            src={require('../../resources/profile/timeline/Timeline.png')}
            hoverable
            preview={false}
            actions={[
                <Button type='primary'>Anar</Button>
            ]}
        >
            <p
                style={{textAlign: 'justify'}}
            >{t('view.profile.sessionHistory.card.Message')}</p>
        </ImageSidedCard>
    );
}