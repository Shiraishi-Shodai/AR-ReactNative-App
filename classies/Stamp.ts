import { ARObject } from "./ARObject";

export class Stamp extends ARObject {
  private _name: string;
  private _img_path: string;

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
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get img_path(): string {
    return this._img_path;
  }
  public set img_path(value: string) {
    this._img_path = value;
  }

  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    name: string,
    img_path: string
  ) {
    super(id, user_id, latitude, longitude, altitude);
    this._name = name;
    this._img_path = img_path;
  }
}
