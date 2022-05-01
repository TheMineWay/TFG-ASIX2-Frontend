import { Tabs } from "antd";
import { t } from "i18next";
import { InventoryItem } from "../../../hooks/inventory/useInventory";
import DiskBuilderForm from "./DiskBuilderForm";
import { DiskBuilderFormValues } from "./DiskBuilderTool";

const { TabPane } = Tabs;

type Props = {
    current: string;
    disks: { [id: string]: DiskBuilderFormValues };
    change: (id: string) => void;
    add: () => void;
    remove: (id: string) => void;
    inventory: InventoryItem[];
    set: (id: string, values: DiskBuilderFormValues) => void;
}

export default function DiskBuilderTabs(props: Props) {

    const onEdit = (e: string | React.MouseEvent | React.KeyboardEvent, action: 'add' | 'remove') => {
        if(action === 'add') props.add();

        props.remove(e.toString());
    }

    return (
        <Tabs
            tabPosition='left'
            onEdit={onEdit}
            type='editable-card'
        >
            {
                Object.keys(props.disks).map((id) => {

                    const disk = props.disks[id];

                    return (
                        <TabPane
                            tab={`${t('view.diskRequest.tabs.Tab')} ${id}`}
                            key={id}
                            closable={true}
                        >
                            <DiskBuilderForm
                                onSave={(values) => {
                                    props.set(id, values);
                                }}
                                originalValue={disk}
                                inventory={props.inventory}
                            />
                        </TabPane>
                    );
                })
            }
        </Tabs>
    );
}