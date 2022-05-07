import { Col, Form, notification, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useState } from 'react';
import useAuthState from '../../../hooks/auth/useAuthState';
import request from '../../../services/api/Request';
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import SubmitFormItem from '../../form/SubmitFormItem';
import TextAreaFormItem from '../../form/TextAreaFormItem';
import OpinionRatingScoreSelector from './OpinionRatingScoreSelector';

export type OpinionFormValues = {
    score: number;
    opinion: string;
}

type Props = {}

export default function OpinionForm(props: Props) {

    const [authState] = useAuthState();

    const [form] = useForm<OpinionFormValues>();

    const [loading, setLoading] = useState<boolean>(false);
    const [rating, setRating] = useState<number>();

    const submit = async (values: OpinionFormValues) => {
        setLoading(true);
        try {
            request<{}>('post', '/actions/ratings/postRating', values, { authCredentials: authState });
            //notification.close('opinion-notification');
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={submit}
        >
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <OpinionRatingScoreSelector
                        onChange={setRating}
                        defaultValue={rating}
                    />
                </Col>
                {
                    rating && (
                        <>
                            <Col span={24}>
                                <TextAreaFormItem
                                    min={5}
                                    max={400}
                                    showCount
                                    name='opinion'
                                    placeholder={t('view.opinions.notification.form.Opinion')}
                                />
                            </Col>
                            <Col span={24}>
                                <SubmitFormItem
                                    text={t('view.opinions.notification.form.Submit')}
                                    loading={loading}
                                />
                            </Col>
                        </>
                    )
                }
            </Row>
        </Form>
    );
}
