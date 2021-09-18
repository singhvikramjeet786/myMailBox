export interface Message {
    id: string;
    messageTitle: string;
    sentBy: string;
    messageBody: string;
    messageDeliveryDate: string,
    isRead: boolean;
    isDelete: boolean;
    isSelected:boolean;
}