import { ARObject } from "./ARObject";

export class Comment extends ARObject {
  private _text: string;
  private _color: string;

  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    this._text = value;
  }

  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }

  constructor(
    id: string,
    user_id: string,
    latitude: number,
    longitude: number,
    altitude: number,
    post_time: string,
    text: string,
    color: string,
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
    this._text = text;
    this._color = color;
  }
}
