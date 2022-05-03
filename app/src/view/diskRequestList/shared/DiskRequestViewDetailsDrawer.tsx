import { CheckOutlined, ClockCircleOutlined, CoffeeOutlined, SendOutlined } from "@ant-design/icons";
import { Col, Collapse, Divider, Drawer, List, Row, Skeleton, Timeline } from "antd";
import { t } from "i18next";
import moment from "moment";
import QRCode from "react-qr-code";
import useCoins from "../../../hooks/coins/useCoins";
import useDetailedDiskRequest, { DiskRequestStateObject } from "../../../hooks/diskRequest/useDetailedDiskRequest";
import { DiskRequestListItem } from "../../../hooks/diskRequest/useDiskRequestList";
import DateDisplay from "../../shared/DateDisplay";

type Props = {
    onClose: () => void;
    item?: DiskRequestListItem;
}

export default function DiskRequestViewDetailsDrawer(props: Props) {

    const { DisplayPrice } = useCoins();
    const { purchase, loading } = useDetailedDiskRequest(props.item?.id ?? null);

    const states = purchase?.states ?? [];

    const StatesTimeline = () => {

        function processStateColor(state: DiskRequestStateObject): string {
            switch(state.state) {
                case 'delivered': return 'green';
                case 'pending': return 'red';
                case 'processing': return 'orange';
                case 'sent': return 'blue';
                default: return 'cyan';
            }
        }

        function processStateIcon(state: DiskRequestStateObject): JSX.Element | undefined {
            switch(state.state) {
                case 'delivered': return <CheckOutlined/>;
                case 'pending': return <ClockCircleOutlined/>;
                case 'processing': return <CoffeeOutlined/>;
                case 'sent': return <SendOutlined/>;
                default: return undefined;
            }
        }

        return (
            <Timeline>
                {
                    states
                        .sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1)
                        .map((state) => {
                            return (
                                <Timeline.Item
                                    color={processStateColor(state)}
                                    dot={processStateIcon(state)}
                                >
                                    <p>{t(`view.diskRequestList.list.itemDrawer.sections.state.states.${state.state}`)}</p>
                                    <small><DateDisplay>{state.createdAt}</DateDisplay></small>
                                </Timeline.Item>
                            )
                        })
                }
            </Timeline>
        )
    };

    const Footer = () => (
        <div
            style={{
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {
                props.item && (
                    <QRCode value={`{"id":"${props.item!.id}","website":"plugandwork.cat"}`}/>
                )
            }
        </div>
    );

    console.log(purchase?.builds);

    const RequestedDiskList = () => (
        <Collapse>
            {
                purchase?.builds.map((purchase, i) => (
                    <Collapse.Panel
                        header={purchase.build.disk}
                        key={`collapse_${i}`}
                    >
                        <List>
                            {
                                purchase.items.map((item) => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Collapse.Panel>
                ))
            }
        </Collapse>
    );

    return (
        <Drawer
            title={<><DateDisplay>{purchase?.purchase.createdAt}</DateDisplay></>}
            onClose={props.onClose}
            visible={props.item !== undefined}
            footer={<Footer/>}
        >
            <Skeleton
                loading={loading}
            >
                <Row
                    gutter={[12, 12]}
                >
                    <Col>
                        <h3>{t('view.diskRequestList.list.itemDrawer.sections.amount.Title')}</h3>
                        <p>
                            {t('view.diskRequestList.list.itemDrawer.sections.amount.Total')}: <b><DisplayPrice price={purchase?.purchase.amount ?? 0} /></b>
                            <br />
                            {t('view.diskRequestList.list.itemDrawer.sections.amount.Card')}: <b>{purchase?.payment.card}</b></p>
                    </Col>
                    <Col span={24}>
                        <Divider />
                        <h3>{t('view.diskRequestList.list.itemDrawer.sections.state.Title')}</h3>
                        <br />
                        <StatesTimeline />
                    </Col>
                    <Col>
                        <Divider/>
                        <h3>{t('view.diskRequestList.list.itemDrawer.sections.request.Title')}</h3>
                        <br/>
                        <RequestedDiskList/>
                    </Col>
                </Row>
            </Skeleton>
        </Drawer>
    );
}