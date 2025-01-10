import { ARObject } from "./ARObject";
class Stamp extends ARObject {
    private _name: string;
    private _img: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get img(): string {
        return this._img;
    }

    public set img(value: string) {
        this._img = value;
    }
}
