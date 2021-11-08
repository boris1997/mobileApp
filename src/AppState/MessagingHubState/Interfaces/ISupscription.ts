import { SubscriptionType } from "../Enums/SubscriptionType";

export class ISubscription {
    id!: string;
    connectionId!: string;
    objectId!: string;
    type!: SubscriptionType;
};