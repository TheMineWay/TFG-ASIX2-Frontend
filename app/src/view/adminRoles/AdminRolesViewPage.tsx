import { CheckOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Switch } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import useAdminRoles from "../../hooks/roles/useAdminRoles";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";

export default function AdminRolesViewPage() {
    const {
        permissions,
        roles,
        setRolePermissions,
        isLoading,
    } = useAdminRoles();

    const [selectedRole, setSelectedRole] = useState<string | undefined>();
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

    useEffect(() => {
        const role = roles?.find((r) => r.id === selectedRole);
        if (!role) {
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
                roles
                .filter((role) => !role.superadmin)
                .map((role) => (
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
                                    if (v) {
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

    const onSave = async () => {
        if(!selectedRole || !selectedPerms) return;
        await setRolePermissions(selectedRole, selectedPerms);
    }

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
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            xl={4}
                        >
                            <Button
                                disabled={!selectedRole}
                                icon={<SaveOutlined/>}
                                type='primary'
                                onClick={onSave}
                                loading={isLoading(selectedRole ?? '')}
                            >
                                {t('common.actions.Save')}
                            </Button>
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
                    <NoData />
                )
            }
        </Row>
    );
}