import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import useAdminContactForm, { ContactFormItem } from "../../../hooks/contactForm/useAdminContactForm";
import DateDisplay from "../../shared/DateDisplay";
import Loading from "../../shared/Loading";
import NoData from "../../shared/NoData";

export default function AdminContactFormViewPage() {

    const {
        markAsRead,
        markAsUnread,
        loadingSetState,
        loading,
        formItems,
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
                    style={{
                        width: '100%',
                    }}
                    hoverable
                >
                    <h3>{item.email}</h3>
                    <><DateDisplay>{item.createdAt}</DateDisplay></>
                </Card>
            </Col>
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