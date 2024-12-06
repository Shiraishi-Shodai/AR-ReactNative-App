export class Comment {
    private _id: string;
    private _text: string;
    private _latitude: number;
    private _longitude: number;

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
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

    constructor(id: string, text: string, latitude: number, longitude: number) {
        this._id = id;
        this._text = text;
        this._latitude = latitude;
        this._longitude = longitude;
    }
}
