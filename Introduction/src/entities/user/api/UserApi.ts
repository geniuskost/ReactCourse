import { getUserFromJwt } from '../lib/UserLib';
import type IUser from '../model/IUser';

export default class UserApi {
    static authenticate(login: string, password: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            // одним з правил автентифікації є навмисно закладений відчутний час
            // самої процедури (близько 1с) з безпекових міркувань
            setTimeout(() => {
                if (login === 'user' && password === '123') {
                    const jwt =
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwibmFtZSI6ItCi0LXRgdGC0L7QstC40Lkg0JrQvtGA0LjRgdGC0YPQstCw0YciLCJlbWFpbCI6InVzZXJAaS51YSJ9.mock-signature';
                    resolve(getUserFromJwt(jwt));
                } else {
                    reject(401);
                }
            }, 1000);
        });
    }
}
