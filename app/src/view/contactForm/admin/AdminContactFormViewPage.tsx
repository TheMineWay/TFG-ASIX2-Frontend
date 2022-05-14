import { DeleteOutlined, EyeOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Popconfirm } from "antd";
import { t } from "i18next";
import useAdminContactForm, { ContactFormItem } from "../../../hooks/contactForm/useAdminContactForm";
import DateDisplay from "../../shared/DateDisplay";
import Loading from "../../shared/Loading";
import NoData from "../../shared/NoData";

export default function AdminContactFormViewPage() {

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

    const Item = (props: { item: ContactFormItem }) => {
        const item = props.item;

        return (
            <Col
                xs={12}
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
                                <Button
                                    icon={<EyeOutlined />}
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
                    <h3>{item.email}</h3>
                    <><DateDisplay>{item.createdAt}</DateDisplay></>
                </Card >
            </Col >
        );
    }

    return (
        <Row
            gutter={[24, 24]}
        >
            {
                (formItems ?? []).length <= 0 ? (
                    <NoData />
                ) : (
                    formItems?.map((item) => <Item item={item} />)
                )
            }
        </Row>
    );
}