import { t } from "i18next";

export default function shareWebsite(): void {
    if(navigator.share) {
        navigator.share({
            title: t('share.Title'),
            text: t('share.Text'),
            url: 'https://plugandwork.cat'
        });
    }
}

export function canShare(): boolean {
    try {
        return (typeof navigator.share === 'function') ?? false;
    } catch(e: any) {
        return false;
    }
}