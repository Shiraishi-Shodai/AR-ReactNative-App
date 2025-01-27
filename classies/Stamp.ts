import { ARObject } from "./ARObject";

export class Stamp extends ARObject {
  private _source: string;
  private _name: string;

  public get source(): string {
    return this._source;
  }
  public set source(value: string) {
    this._source = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    post_time: string,
    name: string,
    source?: string,
    user_displayName?: string,
    user_photoURL?: string
  ) {
    super(
      id,
      user_id,
      latitude,
      longitude,
      altitude,
      post_time,
      user_displayName,
      user_photoURL
    );
    this._source = source ?? "";
    this._name = name;
  }
}
