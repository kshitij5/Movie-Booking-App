import { Role } from './role';

export class User {
  public loginId!: string;
  public firstName!: string;
  public lastName!: string;
  public emailId!: string;
  public password!: string;
  public contactNumber!: string;
  public roles!: Set<Role>;
}
