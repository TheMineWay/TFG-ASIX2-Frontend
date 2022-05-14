import { Drawer } from 'antd';
import { ContactFormItem } from '../../../hooks/contactForm/useAdminContactForm';

type Props = {
    item?: ContactFormItem;
    hide: () => void;
}

export default function AdminContactFormViewItemDrawer(props: Props) {
    return (
        <Drawer
            visible={props.item !== undefined}
            onClose={props.hide}
        >

        </Drawer>
    );
}