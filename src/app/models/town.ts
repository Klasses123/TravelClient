import Region from './region';
import Company from './company';

export default class Town {
    public id: string;
    public name: string;
    public description: string;
    public region: Region;
    public company: Company;
}