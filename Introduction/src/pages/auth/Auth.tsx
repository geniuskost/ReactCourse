import { useContext, useState } from 'react';
import './ui/Auth.css';
import SignUp from './ui/sign_up/SignUp';
import ForgotPassword from './ui/forgot_password/ForgotPassword';
import Profile from './ui/profile/Profile';
import UserApi from '../../entities/user/api/UserApi';
import AppContext from '../../features/_context/AppContext';
import { rememberUser } from '../../entities/user/lib/UserLib';

const PageModes = {
    signIn: 'signIn',
    signUp: 'signUp',
    forgotPassword: 'forgotPassword',
} as const;

type PageModes = (typeof PageModes)[keyof typeof PageModes];

export default function Auth() {
    const { user } = useContext(AppContext);
    const [pageMode, setPageMode] = useState<PageModes>(PageModes.signIn);

    if (user) {
        return <Profile />;
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-header">
                    {pageMode === PageModes.signIn && 'Форма входу'}
                    {pageMode === PageModes.signUp && 'Реєстрація'}
                    {pageMode === PageModes.forgotPassword && 'Відновлення паролю'}
                </h2>
                <div className="d-flex justify-content-between mx-3 gap-3">
                    <button
                        className={`flex-1 btn ${pageMode === PageModes.signIn ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setPageMode(PageModes.signIn)}
                    >
                        Вхід
                    </button>
                    <button
                        className={`flex-1 btn ${pageMode === PageModes.signUp ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setPageMode(PageModes.signUp)}
                    >
                        Реєстрація
                    </button>
                </div>
                {pageMode === PageModes.signIn && <SignIn onForgotPassword={() => setPageMode(PageModes.forgotPassword)} />}
                {pageMode === PageModes.signUp && <SignUp />}
                {pageMode === PageModes.forgotPassword && <ForgotPassword onBack={() => setPageMode(PageModes.signIn)} />}
            </div>
        </div>
    );
}

function SignIn({ onForgotPassword }: { onForgotPassword: () => void }) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setUser } = useContext(AppContext);

    const isFormValid = login.length > 2 && password.length > 2;

    const signInClick = () => {
        UserApi.authenticate(login, password)
            .then(u => {
                rememberUser(u);
                setUser(u);
            })
            .catch(err => {
                if (err === 401) {
                    alert('У вході відмовлено. Перевірте введені дані');
                }
            });
    };

    return (
        <div className="auth-form-content mx-3 my-4">
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-lock"></i></span>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Логін"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    aria-label="Username"
                    aria-describedby="login-addon"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-key"></i></span>
                <input
                    className="form-control"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    aria-label="Password"
                    aria-describedby="password-addon"
                />
            </div>
            <button
                className={`btn ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
                onClick={isFormValid ? signInClick : undefined}
            >
                Вхід
            </button>
            <div className="auth-links">
                <button type="button" className="btn btn-link" onClick={onForgotPassword}>
                    Забули пароль?
                </button>
            </div>
        </div>
    );
}
