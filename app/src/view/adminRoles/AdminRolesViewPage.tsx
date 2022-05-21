import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Space, Switch } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import useAdminRoles from "../../hooks/roles/useAdminRoles";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import Popconfirm from "../shared/Popconfirm";
import AdminRolesCreateRoleDrawer from "./AdminRolesCreateRoleDrawer";

export default function AdminRolesViewPage() {
    const {
        permissions,
        roles,
        setRolePermissions,
        isLoading,
        createRole,
        deleteRole,
    } = useAdminRoles();

    const [selectedRole, setSelectedRole] = useState<string | undefined>();
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
    const [createVisible, setCreateVisible] = useState<boolean>(false);

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
        if (!selectedRole || !selectedPerms) return;
        await setRolePermissions(selectedRole, selectedPerms);
    }

    return (
        <>
            <AdminRolesCreateRoleDrawer
                visible={createVisible}
                hide={() => setCreateVisible(false)}
                createRole={createRole}
            />
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
                                <Space>
                                    <Button
                                        disabled={!selectedRole}
                                        icon={<SaveOutlined />}
                                        type='primary'
                                        onClick={onSave}
                                        loading={isLoading(selectedRole ?? '')}
                                    >
                                        {t('common.actions.Save')}
                                    </Button>
                                    <Popconfirm
                                        disabled={!selectedRole}
                                        onOk={async () => {
                                            await deleteRole(selectedRole ?? '');
                                            setSelectedRole(undefined);
                                        }}
                                        title={t('view.adminRoles.confirmDelete.Title')}
                                    >
                                        <Button
                                            disabled={!selectedRole}
                                            icon={<DeleteOutlined />}
                                            type='primary'
                                        >
                                            {t('common.actions.Delete')}
                                        </Button>
                                    </Popconfirm>
                                    <Button
                                        icon={<PlusOutlined />}
                                        type='primary'
                                        onClick={() => setCreateVisible(true)}
                                    >
                                        {t('common.actions.Create')}
                                    </Button>
                                </Space>
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
        </>
    );
}