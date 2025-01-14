import { ARObject } from "@/classies/ARObject";

export interface ARObjectManager {
  getARObjects(): Promise<ARObject[]>;
  addARObjects(object: ARObject): void;
  deleteARObjects(object: ARObject): void;
  listMyARObjects(): ARObject[];
}
