import { Drawer } from 'antd';
import { t } from 'i18next';
import { ContactFormItem } from '../../../hooks/contactForm/useAdminContactForm';
import DateDisplay from '../../shared/DateDisplay';

type Props = {
    item?: ContactFormItem;
    hide: () => void;
}

export default function AdminContactFormViewItemDrawer(props: Props) {
    return (
        <Drawer
            visible={props.item !== undefined}
            onClose={props.hide}
            title={<DateDisplay>{props.item?.createdAt}</DateDisplay>}
            footer={[
                
            ]}
        >
            <p>
                <b>{t('view.contactForm.admin.viewItem.Name')}</b>: {props.item?.name}
            </p>
            <p>
                <b>{t('view.contactForm.admin.viewItem.Email')}</b>: {props.item?.email}
            </p>
            <p>
                <b>{t('view.contactForm.admin.viewItem.Message')}</b>: {props.item?.message}
            </p>
        </Drawer>
    );
}