import Company from '../company';
import Region from '../region';

export default class CreateTravelRequest {
  public name: string;
  public description: string;
  public companyOrganizer: Company;
  public region: Region;
}