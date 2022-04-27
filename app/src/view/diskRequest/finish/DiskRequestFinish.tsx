import { Col, Row } from "antd";
import { useEffect } from "react";
import { UseDiskRequest } from "../../../hooks/diskRequest/useDiskRequest";

type Props = {
    diskRequest: UseDiskRequest;
}

export default function DiskRequestFinish(props: Props) {

    useEffect(() => {
        props.diskRequest.request();
    }, []);

    return (
        <Row>
            <Col>
                
            </Col>
        </Row>
    );
}