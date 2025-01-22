import { ARObject } from "./ARObject";

export class Stamp extends ARObject {
    private _img_path: string;
    private _name: string;

    public get img_path(): string {
        return this._img_path;
    }
    public set img_path(value: string) {
        this._img_path = value;
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
        img_path: string,
        name: string,
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
        this._img_path = img_path;
        this._name = name;
    }

    async editARObject(object: ARObject): Promise<void> {}
}
