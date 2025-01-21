import { ARObject } from "./ARObject";

export class Comment extends ARObject {
  private _text: string;

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
    post_time: string,
    text: string
  ) {
    super(id, user_id, latitude, longitude, altitude, post_time);
    this._text = text;
  }

  // 編集
  async editARObject(object: ARObject): Promise<void> {}
}
