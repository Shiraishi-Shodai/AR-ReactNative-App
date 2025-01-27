export abstract class ARObject {
  protected _id: string;
  protected _user_id: string;
  protected _user_displayName: string;
  protected _user_photoURL: string;
  protected _longitude: number;
  protected _latitude: number;
  protected _altitude: number;
  protected _post_time: string;
  private _x: number;
  private _y: number;
  private _z: number;

  // データベースに格納するデータ
  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    post_time: string,
    user_displayName?: string,
    user_photoURL?: string,
    x?: number,
    y?: number,
    z?: number
  ) {
    this._id = id;
    this._user_id = user_id;
    this._latitude = latitude;
    this._longitude = longitude;
    this._altitude = altitude;
    this._post_time = post_time;
    this._user_displayName = user_displayName ?? "";
    this._user_photoURL = user_photoURL ?? "";
    this._x = x ?? 0;
    this._y = y ?? 0;
    this._z = z ?? 0;
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
  public get user_displayName(): string {
    return this._user_displayName;
  }
  public set user_displayName(value: string) {
    this._user_displayName = value;
  }
  public get user_photoURL(): string {
    return this._user_photoURL;
  }
  public set user_photoURL(value: string) {
    this._user_photoURL = value;
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
  public get post_time(): string {
    return this._post_time;
  }
  public set post_time(value: string) {
    this._post_time = value;
  }

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  public get z(): number {
    return this._z;
  }
  public set z(value: number) {
    this._z = value;
  }

  // コメントまたはスタンプを編集
  abstract editARObject(object: ARObject): Promise<void>;
}
