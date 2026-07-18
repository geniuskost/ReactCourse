import { useContext, useState } from 'react';
import './SignUp.css';
import AppContext from '../../../../features/_context/AppContext';

interface IFormData {
    login: string;
    email: string;
    password: string;
    repeat: string;
    isAgree: boolean;
}

const initialFormData: IFormData = {
    login: '',
    email: '',
    password: '',
    repeat: '',
    isAgree: false,
};

function isEmailValid(email: string): boolean {
    return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
}

const emailFeedback = "Адреса е-пошти повинна містити символи '@' та '.'";
const loginFeedback = 'Логін має містити щонайменше 3 символи';
const repeatFeedback = 'Паролі не співпадають';

export default function SignUp() {
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const { showAlert } = useContext(AppContext);

    const valids = {
        login: formData.login.length > 2,
        email: isEmailValid(formData.email),
        password: formData.password.length > 2,
        repeat: formData.password.length > 0 && formData.password === formData.repeat,
    };

    const isFormValid: boolean =
        valids.login && valids.email && valids.password && valids.repeat && formData.isAgree;

    return (
        <div className="reg-form-content mx-3 my-4">
            <div className="input-group mb-3">
                <span className="input-group-text" id="email-addon"><i className="bi bi-envelope-at"></i></span>
                <input
                    className={'form-control ' + (formData.email.length === 0 ? '' : valids.email ? 'is-valid' : 'is-invalid')}
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    aria-label="User E-mail"
                    aria-describedby="email-addon"
                />
                <div className="invalid-feedback">{emailFeedback}</div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-lock"></i></span>
                <input
                    className={'form-control ' + (formData.login.length === 0 ? '' : valids.login ? 'is-valid' : 'is-invalid')}
                    type="text"
                    placeholder="Логін"
                    value={formData.login}
                    onChange={e => setFormData({ ...formData, login: e.target.value })}
                    aria-label="Username"
                    aria-describedby="login-addon"
                />
                <div className="invalid-feedback">{loginFeedback}</div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-key"></i></span>
                <input
                    className={'form-control ' + (formData.password.length === 0 ? '' : valids.password ? 'is-valid' : 'is-invalid')}
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    aria-label="Password"
                    aria-describedby="password-addon"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="repeat-addon"><i className="bi bi-key-fill"></i></span>
                <input
                    className={'form-control ' + (formData.repeat.length === 0 ? '' : valids.repeat ? 'is-valid' : 'is-invalid')}
                    type="password"
                    placeholder="********"
                    value={formData.repeat}
                    onChange={e => setFormData({ ...formData, repeat: e.target.value })}
                    aria-label="Repeat Password"
                    aria-describedby="repeat-addon"
                />
                <div className="invalid-feedback">{repeatFeedback}</div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        checked={formData.isAgree}
                        onChange={e => setFormData({ ...formData, isAgree: e.target.checked })}
                        aria-label="Погодження з правилами сайту"
                    />
                </div>
                <input
                    type="text"
                    className="form-control"
                    aria-label="Погодження з правилами сайту"
                    value="Я погоджуюсь з правилами сайту"
                    readOnly
                />
            </div>
            <button
                className={`btn ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
                onClick={
                    isFormValid
                        ? () => {
                              showAlert({
                                  title: 'Реєстрація завершена',
                                  message: `Користувача "${formData.login}" зареєстровано`,
                                  isCancelable: true,
                              });
                              setFormData(initialFormData);
                          }
                        : undefined
                }
            >
                Реєстрація
            </button>
        </div>
    );
}
