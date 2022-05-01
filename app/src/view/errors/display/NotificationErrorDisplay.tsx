import { notification } from 'antd'
import { t } from 'i18next';
import React from 'react'
import { ErrorResponse } from '../../../services/api/Request';

export default function notificationErrorDisplay(error: ErrorResponse) {
    notification.error({
        message: t(`errors.${error.section}.${error.code}.Title`),
        description: t(`errors.${error.section}.${error.code}.Message`),
    });
}