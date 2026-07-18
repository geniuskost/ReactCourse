import Base64 from '../../../shared/base64/Base64';
import type IUser from '../model/IUser';

function getUserFromJwt(jwt: string): IUser {
    // для фронтенду цікавий тільки payload: розділяємо токен за символом "." і беремо другу частину
    const payload = jwt.split('.')[1];
    const jsonString = Base64.decodeUrl(payload);
    const jsonObject = JSON.parse(jsonString);
    return {
        token: jwt,
        email: jsonObject.email,
        name: jsonObject.name,
        login: jsonObject.sub,
    };
}

function rememberUser(user: IUser): void {
    window.localStorage.setItem('shop-token', user.token);
}

function clearRememberedUser(): void {
    window.localStorage.removeItem('shop-token');
}

function getRememberedUser(): IUser | undefined {
    const token = window.localStorage.getItem('shop-token');
    if (token) {
        return getUserFromJwt(token);
    }
    return undefined;
}

export { getUserFromJwt, rememberUser, clearRememberedUser, getRememberedUser };
