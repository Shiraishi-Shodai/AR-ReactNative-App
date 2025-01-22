export abstract class ARObject {
    protected _id: string;
    protected _user_id: string;
    protected _longitude: number;
    protected _latitude: number;
    protected _altitude: number;

    constructor(
        id: string,
        user_id: string,
        longitude: number,
        latitude: number,
        altitude: number
    ) {
        this._id = id;
        this._user_id = user_id;
        this._longitude = longitude;
        this._latitude = latitude;
        this._altitude = altitude;
    }

    abstract editARObject(object: ARObject): Promise<void>;
}
