import moment, { Moment } from "moment";

export type UserModel = {
    name: string;
    lastName: string;
    login: string;
    phone: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    id: string;
    email: string;
    birthdate: Moment;
    isBanned: boolean;
}

export type RawUserModel = {
    name: string;
    lastName: string;
    login: string;
    phone: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    id: string;
    email: string;
    birthdate: string;
    isBanned: '1' | '0';
}

export function processRawUserModel(raw: RawUserModel): UserModel {
    return {
        ...raw,
        isBanned: raw.isBanned === '1' ? true : false,
        birthdate: moment(new Date(Date.parse(raw.birthdate)))
    };
}