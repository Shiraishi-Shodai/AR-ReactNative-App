import database, { firebase } from "@react-native-firebase/database";

export class User {
  private _id: string;
  private _displayName: string | null;
  private _photoURL: string | null;
  private _email: string | null;

  constructor(
    id: string,
    displayName: string | null,
    photoURL: string | null,
    email: string | null
  ) {
    this._id = id;
    this._displayName = displayName;
    this._photoURL = photoURL;
    this._email = email;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get displayName(): string | null {
    return this._displayName;
  }
  public set displayName(value: string | null) {
    this._displayName = value;
  }
  public get photoURL(): string | null {
    return this._photoURL;
  }
  public set photoURL(value: string | null) {
    this._photoURL = value;
  }
  public get email(): string | null {
    return this._email;
  }
  public set email(value: string | null) {
    this._email = value;
  }

  // 自分自身が既に存在するか
  public isAlreadyExist = async (): Promise<any> => {
    try {
      const userRef = database().ref(`users/${this.id}`);
      const snapshot = await userRef.once("value");
      const res = snapshot.val();
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  public subscribe = async (): Promise<void> => {
    try {
      const userRef = database().ref(`users/${this.id}/`);
      await userRef.set({
        displayName: this.displayName,
        photoURL: this.photoURL,
        email: this.email,
        comments: { placeholder: true },
        stamps: { placeholder: true },
      });
    } catch (e) {
      console.log(e);
    }
  };
}
