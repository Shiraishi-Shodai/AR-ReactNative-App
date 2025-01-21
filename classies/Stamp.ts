import { ARObject } from "./ARObject";

export class Stamp extends ARObject {
  private _img_path: string;

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
    post_time: string,
    img_path: string
  ) {
    super(id, user_id, latitude, longitude, altitude, post_time);
    this._img_path = img_path;
  }

  async editARObject(object: ARObject): Promise<void> {}
}
