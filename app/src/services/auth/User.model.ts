import moment, { Moment } from "moment";

export type UserModel = {
    name: string;
    lastName: string;
    login: string;
    phone: string;
    isEmailVerified: boolean;
    createdAt: Date;
    id: string;
    email: string;
    birthdate: Moment;
}

export type RawUserModel = {
    name: string;
    lastName: string;
    login: string;
    phone: string;
    isEmailVerified: boolean;
    createdAt: Date;
    id: string;
    email: string;
    birthdate: string;
}

export function processRawUserModel(raw: RawUserModel): UserModel {
    return {
        ...raw,
        birthdate: moment(new Date(Date.parse(raw.birthdate)))
    };
}