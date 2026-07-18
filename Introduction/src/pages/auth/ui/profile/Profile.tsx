import { useContext, useState } from 'react';
import './Profile.css';
import AppContext from '../../../../features/_context/AppContext';
import { clearRememberedUser } from '../../../../entities/user/lib/UserLib';

/*
Д.З. Створити (наповнити) сторінку "Кабінет користувача" (профіль)
Додати кнопку виходу з облікового запису
Включити елементи (чекбокс + кнопка) для видалення профілю
https://gdpr-info.eu/art-17-gdpr/
*/

export default function Profile() {
    const { user, setUser } = useContext(AppContext);
    const [isDeleteAgree, setDeleteAgree] = useState<boolean>(false);

    if (!user) {
        return null;
    }

    const logout = () => {
        clearRememberedUser();
        setUser(undefined);
    };

    const deleteProfile = () => {
        clearRememberedUser();
        setUser(undefined);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-header">Кабінет користувача</h2>
                <div className="profile-info mx-3 my-3">
                    <div className="profile-row">
                        <i className="bi bi-person"></i>
                        <span>{user.login}</span>
                    </div>
                    {user.name && (
                        <div className="profile-row">
                            <i className="bi bi-card-text"></i>
                            <span>{user.name}</span>
                        </div>
                    )}
                    <div className="profile-row">
                        <i className="bi bi-envelope-at"></i>
                        <span>{user.email}</span>
                    </div>
                </div>

                <div className="mx-3 mb-3">
                    <button className="btn btn-secondary w-100" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i> Вийти з облікового запису
                    </button>
                </div>

                <div className="profile-danger-zone mx-3 mb-3">
                    <p className="text-muted">
                        Відповідно до{' '}
                        <a href="https://gdpr-info.eu/art-17-gdpr/" target="_blank" rel="noreferrer">
                            права на забуття (GDPR, ст. 17)
                        </a>{' '}
                        ви можете повністю видалити свій профіль. Дію неможливо скасувати.
                    </p>
                    <div className="input-group mb-3">
                        <div className="input-group-text">
                            <input
                                className="form-check-input mt-0"
                                type="checkbox"
                                checked={isDeleteAgree}
                                onChange={e => setDeleteAgree(e.target.checked)}
                                aria-label="Погодження на видалення профілю"
                            />
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Погодження на видалення профілю"
                            value="Я розумію наслідки та хочу видалити профіль"
                            readOnly
                        />
                    </div>
                    <button
                        className={`btn w-100 ${isDeleteAgree ? 'btn-danger' : 'btn-secondary'}`}
                        onClick={isDeleteAgree ? deleteProfile : undefined}
                    >
                        <i className="bi bi-trash3"></i> Видалити профіль
                    </button>
                </div>
            </div>
        </div>
    );
}
