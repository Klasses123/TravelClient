import User from './user';
import Travel from './travel';

export default class Company {
    public id: string;
    public name: string;
    public createdOn: Date;
    public owner: User;
    public email: string;
    public phoneNumber: string;
    public companyUsers: User[];
    public travels: Travel[];
}