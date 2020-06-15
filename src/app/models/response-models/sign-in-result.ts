import User from '../user';

export default class SignInResult {
    public token?: string;
    public refreshToken?: string;
    public user?: User;
}