import { ARObject } from "./ARObject";

export class Stamp extends ARObject {
  private _name: string;
  private _source: string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get source(): string {
    return this._source;
  }
  public set source(value: string) {
    this._source = value;
  }

  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    name: string,
    source: string
  ) {
    super(id, user_id, latitude, longitude, altitude);
    this._name = name;
    this._source = source;
  }

  async editARObject(object: ARObject): Promise<void> {}
}
