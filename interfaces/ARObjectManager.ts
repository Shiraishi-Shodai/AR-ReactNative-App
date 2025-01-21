import { ARObject } from "@/classies/ARObject";
import { User } from "@/classies/User";

export interface ARObjectManager {
  // 全ユーザーが投稿したコメントまたはスタンプのデータを取得
  listAllARObjects(): Promise<ARObject[]>;
  // コメントまたはスタンプを投稿
  inputARObjects(object: ARObject): Promise<void>;
  // コメントまたはスタンプを削除
  deleteARObjects(object: ARObject): Promise<void>;
  // ログイン中のユーザーが投稿したコメントまたはスタンプのデータを取得
  listMyARObjects(user: User): Promise<ARObject[]>;
  // user/user_id/comments or user/user_id/stampsを取得する
  // getUserCurrenARObjectData(user_id: string): Promise<Object>;
}
