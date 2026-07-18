import { useState } from 'react';
import './ForgotPassword.css';

/*
Д.З. Додати режим "Забув пароль" до форми сторінки Auth
Реалізувати два поля введення: пошта та дата (народження)
Забезпечити блокування кнопки форми до введення усіх даних
*/

export default function ForgotPassword({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [isSent, setSent] = useState<boolean>(false);

    const isFormValid = email.trim().length > 0 && birthDate.trim().length > 0;

    const submit = () => {
        setSent(true);
    };

    if (isSent) {
        return (
            <div className="auth-form-content mx-3 my-4">
                <p>
                    Інструкції з відновлення паролю надіслано на <strong>{email}</strong>
                </p>
                <button type="button" className="btn btn-secondary" onClick={onBack}>
                    Повернутись до входу
                </button>
            </div>
        );
    }

    return (
        <div className="auth-form-content mx-3 my-4">
            <div className="input-group mb-3">
                <span className="input-group-text" id="fp-email-addon"><i className="bi bi-envelope-at"></i></span>
                <input
                    className="form-control"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-label="E-mail"
                    aria-describedby="fp-email-addon"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="fp-birthdate-addon"><i className="bi bi-calendar-event"></i></span>
                <input
                    className="form-control"
                    type="date"
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    aria-label="Дата народження"
                    aria-describedby="fp-birthdate-addon"
                />
            </div>
            <button
                className={`btn ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
                onClick={isFormValid ? submit : undefined}
            >
                Відновити пароль
            </button>
            <div className="auth-links">
                <button type="button" className="btn btn-link" onClick={onBack}>
                    Повернутись до входу
                </button>
            </div>
        </div>
    );
}
