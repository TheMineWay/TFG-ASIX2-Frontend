import { t } from "i18next";

export default function shareWebsite(): void {
    if(navigator.canShare( {
        title: t('share.Title')
    })) {
        navigator.share();
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