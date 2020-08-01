import Travel from './travel';
import Town from './town';

export default class Region {
    public id?: string;
    public name: string;
    public towns?: Town[];
    public travels?: Travel[];
}