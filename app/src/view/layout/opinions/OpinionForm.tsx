import { Col, Form, message, notification, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { t } from 'i18next';
import { useState } from 'react';
import { AuthCredentials } from '../../../context/AuthContext';
import request from '../../../services/api/Request';
import notificationErrorDisplay from '../../errors/display/NotificationErrorDisplay';
import SubmitFormItem from '../../form/SubmitFormItem';
import TextAreaFormItem from '../../form/TextAreaFormItem';
import OpinionRatingScoreSelector from './OpinionRatingScoreSelector';

export type OpinionFormValues = {
    score: number;
    opinion: string;
}

type Props = {
    authState?: AuthCredentials;
    defaultValues?: OpinionFormValues;
    center?: boolean;
}

export default function OpinionForm(props: Props) {

    const [form] = useForm<{ opinion: string }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [rating, setRating] = useState<number | undefined>(props.defaultValues?.score ?? undefined);

    const submit = async (values: OpinionFormValues) => {
        setLoading(true);
        try {
            request<{}>('post', '/actions/ratings/postRating', {
                score: values.score ?? 1,
                opinion: values.opinion ?? "",
            }, { authCredentials: props.authState });
            notification.close('opinion-notification');
            message.success(t('view.opinions.notification.form.Success'))
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return (
        <Form
            initialValues={props.defaultValues}
            form={form}
            layout='vertical'
            onFinish={(v) => {
                submit({
                    ...v,
                    score: rating ?? 1,
                });
            }}
        >
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: props.center ? 'center' : 'normal',
                        }}
                    >
                        <OpinionRatingScoreSelector
                            onChange={setRating}
                            defaultValue={rating}
                        />
                    </div>
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
