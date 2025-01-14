import { ARObject } from "@/classies/ARObject";

export interface ARObjectManager {
  getARObjects(): Promise<ARObject[]>;
  inputARObjects(object: ARObject): Promise<void>;
  deleteARObjects(object: ARObject): Promise<void>;
  listMyARObjects(user_id: string): Promise<ARObject[]>;
}
