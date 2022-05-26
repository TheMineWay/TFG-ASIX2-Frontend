import { Badge, Card, Col, Input, Row, Tag } from 'antd';
import { t } from 'i18next';
import { useState } from 'react'
import useCoins from '../../hooks/coins/useCoins';
import useInventory from '../../hooks/inventory/useInventory';
import { listFilter } from '../../services/filters/genericFilter';
import Container from '../shared/Container';
import Loading from '../shared/Loading';
import SectionTitle from '../shared/SectionTitle';

export default function InventoryViewPage() {

    const { DisplayPrice } = useCoins();
    const { inventory, loading } = useInventory();

    const [keyword, setKeyword] = useState<string>();

    if (loading) return <Loading />;

    const filteredInventory = inventory?.sort((a, b) => a.description.length > b.description.length ? -1 : 1).filter((v) => listFilter([v.description, v.name], keyword ?? ''));

    const TypeBadge = (props: { isDrive: boolean, children: JSX.Element }) => {
        if (props.isDrive) {
            return (
                <Badge.Ribbon
                    color='cyan'
                    text='drive'
                >
                    {props.children}
                </Badge.Ribbon>
            )
        }

        return props.children;
    }

    return (
        <Container>
            <SectionTitle>{t('view.products.Title')}</SectionTitle>
            <br />
            <Row
                gutter={[24, 24]}
            >
                <Col
                    span={24}
                >
                    <Card>
                        <Input.Search
                            allowClear
                            defaultValue={keyword}
                            onSearch={(v) => setKeyword(v)}
                        />
                    </Card>
                </Col>
                {
                    filteredInventory?.map((item) => (
                        <Col
                            xs={12}
                            lg={6}
                            xl={4}
                            style={{
                                display: 'flex',
                                alignItems: 'stretch',
                            }}
                        >
                            <TypeBadge
                                isDrive={item.isDrive}
                            >
                                <Card
                                    cover={(
                                        <img
                                            src={item.imageUrl}
                                            style={{
                                                maxHeight: 150,
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                    style={{
                                        height: '100%',
                                    }}
                                    bodyStyle={{
                                        maxHeight: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignContent: 'space-between',
                                        }}
                                    >
                                        <Row
                                            gutter={[6, 6]}
                                            justify='space-between'
                                        >
                                            <Col
                                                span={24}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >{item.name}</h3>
                                            </Col>
                                            <Col
                                                span={24}
                                            >
                                                <p
                                                    style={{
                                                        textAlign: 'justify',
                                                    }}
                                                >{item.description}</p>
                                            </Col>
                                        </Row>
                                        <Tag color='blue'><DisplayPrice price={item.price} /></Tag>
                                    </div>
                                </Card>
                            </TypeBadge>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}