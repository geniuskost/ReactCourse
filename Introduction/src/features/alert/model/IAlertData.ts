import type IAlertButton from './IAlertButton';

export default interface IAlertData {
    title?: string;
    message: string;
    buttons?: IAlertButton[];
    isCancelable?: boolean; // чи можна закрити повідомлення кліком поза нього
    onCancel?: () => void;
}
