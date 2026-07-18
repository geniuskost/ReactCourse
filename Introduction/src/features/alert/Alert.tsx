import { useContext } from 'react';
import './ui/Alert.css';
import AppContext from '../_context/AppContext';
import type IAlertData from './model/IAlertData';

export default function Alert({ data }: { data: IAlertData }) {
    const { showAlert } = useContext(AppContext);

    const close = () => {
        data.onCancel?.();
        showAlert(null);
    };

    return (
        <div
            className="alert-bg"
            onClick={() => {
                if (data.isCancelable) {
                    close();
                }
            }}
        >
            <div className="alert-fg" onClick={e => e.stopPropagation()}>
                <div className="alert-header">
                    <h5 className="alert-title">{data.title ?? 'Повідомлення'}</h5>
                    <button type="button" className="btn-close" aria-label="Закрити" onClick={close}></button>
                </div>
                <div className="alert-body">{data.message}</div>
                <div className="alert-footer">
                    {data.buttons && data.buttons.length > 0 ? (
                        data.buttons.map(btn => (
                            <button
                                key={btn.title}
                                className="btn btn-primary"
                                onClick={() => {
                                    btn.action?.();
                                    showAlert(null);
                                }}
                            >
                                {btn.title}
                            </button>
                        ))
                    ) : (
                        <button className="btn btn-secondary" onClick={() => showAlert(null)}>
                            Закрити
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
