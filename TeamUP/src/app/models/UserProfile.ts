export class UserProfile {

  constructor (
    public aboutUser: String,
    public experience: String,
    public experienceOfMin: string,
    public experienceOfMax: String

  ) {}
}
export class industryType {
  constructor(
    public iTypeid: number, 
    public iTypename: string) { }
}
export class industryTypeOf {
  constructor(
    public iTypeOfid: number, 
    public iTypeOfname: string) { }
}