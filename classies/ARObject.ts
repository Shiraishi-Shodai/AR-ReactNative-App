export abstract class ARObject {
  protected _id: string;
  protected _user_id: string;
  protected _longitude: number;
  protected _latitude: number;
  protected _altitude: number;

  constructor(
    id: string,
    user_id: string,
    longitude: number,
    latitude: number,
    altitude: number
  ) {
    this._id = id;
    this._user_id = user_id;
    this._longitude = longitude;
    this._latitude = latitude;
    this._altitude = altitude;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get user_id(): string {
    return this._user_id;
  }
  public set user_id(value: string) {
    this.user_id = value;
  }
  public get latitude(): number {
    return this._latitude;
  }
  public set latitude(value: number) {
    this._latitude = value;
  }
  public get longitude(): number {
    return this._longitude;
  }
  public set longitude(value: number) {
    this._longitude = value;
  }
  public get altitude(): number {
    return this._altitude;
  }
  public set altitude(value: number) {
    this._altitude = value;
  }

  abstract editARObject(object: ARObject): Promise<void>;
}
