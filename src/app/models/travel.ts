import Company from './company';
import Region from './region';

export default class Travel {
    public id: string;
    public name: string;
    public description: string;
    public companyOrganizer: Company;
    public region: Region;
}