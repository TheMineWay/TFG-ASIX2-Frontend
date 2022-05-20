import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, Col, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import useAdminRoles from "../../hooks/roles/useAdminRoles";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";

export default function AdminRolesViewPage() {
    const {
        permissions,
        roles,
    } = useAdminRoles();

    const [selectedRole, setSelectedRole] = useState<string | undefined>();
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

    useEffect(() => {
        const role = roles?.find((r) => r.id === selectedRole);
        if(!role) {
            setSelectedPerms([]);
            return;
        }

        setSelectedPerms(role.permissions);
    }, [selectedRole]);

    if (!roles || !permissions) return <Loading />

    const RolesSelect = () => (
        <Select<string>
            style={{
                width: '100%',
            }}
            onChange={(v) => setSelectedRole(v)}
            value={selectedRole}
        >
            {
                roles.map((role) => (
                    <Select.Option
                        key={role.id}
                    >
                        {role.name}
                    </Select.Option>
                ))
            }
        </Select>
    );

    const PermissionSelector = () => (
        <Row
            gutter={[12, 12]}
        >
            {
                permissions.map((perm) => (
                    <Col
                        xs={12}
                        lg={8}
                        xl={6}
                        xxl={4}
                        style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            width: '100%',
                        }}
                    >
                        <Card
                            style={{
                                width: '100%',
                            }}
                            bodyStyle={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'center',
                            }}
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={selectedPerms.includes(perm.id)}
                                onChange={(v) => {
                                    if(v) {
                                        const list = selectedPerms;
                                        list.push(perm.id);

                                        setSelectedPerms([
                                            ...list,
                                        ]);
                                    } else {
                                        const list = selectedPerms.filter((p) => p !== perm.id);
                                        setSelectedPerms([
                                            ...list,
                                        ]);
                                    }
                                }}
                            />
                            <>{perm.name}</>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );

    return (
        <Row
            gutter={[24, 24]}
        >
            <Col span={24}>
                <Card>
                    <Row
                        gutter={[12, 12]}
                        justify='center'
                    >
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            xl={4}
                        >
                            <RolesSelect />
                        </Col>
                    </Row>
                </Card>
            </Col>
            {
                selectedRole ? (
                    <Col span={24}>
                        <PermissionSelector />
                    </Col>
                ) : (
                    <NoData/>
                )
            }
        </Row>
    );
}