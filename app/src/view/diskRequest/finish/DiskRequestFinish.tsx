import { Result } from "antd";
import { t } from "i18next";
import { useEffect } from "react";
import { UseDiskRequest } from "../../../hooks/diskRequest/useDiskRequest";
import Loading from "../../shared/Loading";

type Props = {
    diskRequest: UseDiskRequest;
}

export default function DiskRequestFinish(props: Props) {

    useEffect(() => {
        props.diskRequest.request();
    }, []);

    if(props.diskRequest.state === 'processing') return (
        <Result
            title={t('view.diskRequest.step.finish.processing.Title')}
            subTitle={t('view.diskRequest.step.finish.processing.Subtitle')}
            icon={<Loading size={'large'}/>}
        />
    );

    if(props.diskRequest.state === 'processed') return (
        <Result
            status='success'
            title={t('view.diskRequest.step.finish.processed.Title')}
            subTitle={t('view.diskRequest.step.finish.processed.Subtitle')}
        />
    );

    return <></>;
}