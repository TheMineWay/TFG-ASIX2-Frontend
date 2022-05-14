import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { t } from 'i18next';
import { ContactFormItem } from '../../../hooks/contactForm/useAdminContactForm';
import DateDisplay from '../../shared/DateDisplay';

type Props = {
    item?: string;
    items: ContactFormItem[];
    markAsOpened: (id: string) => Promise<void>;
    unmarkAsOpened: (id: string) => Promise<void>;
    hide: () => void;
}

export default function AdminContactFormViewItemDrawer(props: Props) {

    const item = props.items.find((i) => i.id === props.item);

    return (
        <Drawer
            visible={props.item !== undefined}
            onClose={props.hide}
            title={<DateDisplay>{item?.createdAt}</DateDisplay>}
            footer={
                item?.opened ? (
                    <Button
                        onClick={() => props.unmarkAsOpened(item!.id)}
                        block
                        type='primary'
                        icon={<EyeInvisibleOutlined/>}
                    >{t('view.contactForm.admin.actions.MarkAsUnopened')}</Button>
                ) : (
                    <Button
                        onClick={() => props.markAsOpened(item!.id)}
                        block
                        type='primary'
                        icon={<EyeOutlined/>}
                    >{t('view.contactForm.admin.actions.MarkAsOpened')}</Button>
                )
            }
        >
            <p>
                <b>{t('view.contactForm.admin.viewItem.Name')}</b>: {item?.name}
            </p>
            <p>
                <b>{t('view.contactForm.admin.viewItem.Email')}</b>: {item?.email}
            </p>
            <p>
                <b>{t('view.contactForm.admin.viewItem.Message')}</b>: {item?.message}
            </p>
        </Drawer>
    );
}