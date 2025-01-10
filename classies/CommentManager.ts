import { ARObjectManager } from "@/interfaces/ARObjectManager";
import { ARObject } from "./ARObject";

class CommentManager implements ARObjectManager {
  public getARObjects(): ARObject[] {}
  public addARObjects(object: ARObject): void {}
  public deleteARObjects(object: ARObject): void {}
  public listMyARObjects(): ARObject[] {}
}
