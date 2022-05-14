import { DeleteOutlined, EyeOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Popconfirm, Switch, Tag } from "antd";
import { t } from "i18next";
import { useState } from "react";
import useAdminContactForm, { ContactFormItem } from "../../../hooks/contactForm/useAdminContactForm";
import DateDisplay from "../../shared/DateDisplay";
import Loading from "../../shared/Loading";
import NoData from "../../shared/NoData";
import AdminContactFormViewItemDrawer from "./AdminContactFormViewItemDrawer";

export default function AdminContactFormViewPage() {

    const [showDeleted, setShowDeleted] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string>();

    const {
        markAsRead,
        markAsUnread,
        loading,
        formItems,
        deleteItem,
        isLoading,
        recoverItem,
    } = useAdminContactForm();

    if (loading) return <Loading />;

    const items = formItems?.filter((item) => showDeleted || item.deletedAt === null) ?? [];

    const Item = (props: { item: ContactFormItem }) => {
        const item = props.item;

        return (
            <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                }}
            >
                <Card
                    loading={isLoading(item.id)}
                    hoverable
                    style={{
                        width: '100%',
                    }}
                    actions={[
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingRight: 15,
                            }}
                        >
                            <Space>
                                {
                                    item.opened ? (
                                        <Tag
                                            color='green'
                                        >{t('view.contactForm.admin.states.Read')}</Tag>
                                    ) : (
                                        <Tag
                                            color='blue'
                                        >{t('view.contactForm.admin.states.NotRead')}</Tag>
                                    )
                                }
                                <Button
                                    icon={<EyeOutlined />}
                                    onClick={() => setSelectedItemId(item.id)}
                                />
                                {
                                    item.deletedAt ? (
                                        <Popconfirm
                                            onConfirm={() => recoverItem(item.id)}
                                            title={t('view.contactForm.admin.actions.recover.Title')}
                                            okText={t('common.other.Yes')}
                                            cancelText={t('common.other.No')}
                                        >
                                            <Button
                                                icon={<RollbackOutlined />}
                                            />
                                        </Popconfirm>
                                    ) : (
                                        <Popconfirm
                                            onConfirm={() => deleteItem(item.id)}
                                            title={t('view.contactForm.admin.actions.delete.Title')}
                                            okText={t('common.other.Yes')}
                                            cancelText={t('common.other.No')}
                                        >
                                            <Button
                                                icon={<DeleteOutlined />}
                                            />
                                        </Popconfirm>
                                    )
                                }
                            </Space>
                        </div>
                    ]
                    }
                >
                    <h3
                        style={{
                            overflow: 'hidden',
                        }}
                    >{item.email}</h3>
                    <><DateDisplay>{item.createdAt}</DateDisplay></>
                </Card >
            </Col >
        );
    }

    return (
        <>
            <AdminContactFormViewItemDrawer
                markAsOpened={markAsRead}
                unmarkAsOpened={markAsUnread}
                hide={() => setSelectedItemId(undefined)}
                item={selectedItemId}
                items={formItems ?? []}
            />
            <Row
                gutter={[24, 24]}
            >
                <Col
                    span={24}
                >
                    <Card>
                        <div
                            style={{
                                display: 'flex',
                                columnGap: 15,
                            }}
                        >
                            <p>{t('view.contactForm.admin.filters.ShowDeleted')}</p>
                            <Switch
                                onChange={setShowDeleted}
                            />
                        </div>
                    </Card>
                </Col>
                {
                    items.length <= 0 ? (
                        <NoData />
                    ) : (
                        items.map((item) => <Item item={item} />)
                    )
                }
            </Row>
        </>
    );
}