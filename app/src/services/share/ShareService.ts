import { t } from "i18next";

export default function shareWebsite(): void {
    if(navigator.canShare()) {
        navigator.share({
            title: t('share.Title')
        });
    }
}

export function canShare(): boolean {
    try {
        return navigator.canShare() ?? false;
    } catch(e: any) {
        return false;
    }
    return false;
}