import { ARObject } from "./ARObject";

export class Comment extends ARObject {
  private _text: string;

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
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    text: string
  ) {
    super(id, user_id, latitude, longitude, altitude);
    this._text = text;
  }

  // 編集
  public edit(text: string): void {}
}
