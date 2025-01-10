import { ARObject } from "@/classies/ARObject";

export interface ARObjectManager {
  getARObjects(): Promise<ARObject[] | null>;
  addARObjects(object: ARObject): void;
  deleteARObjects(object: ARObject): void;
  listMyARObjects(): ARObject[];
}
