import Company from './company';

export default class User {
    public id: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public registredOn: Date;
    public company: Company;
}