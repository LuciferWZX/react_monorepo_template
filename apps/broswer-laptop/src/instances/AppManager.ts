import { BaseDirectory } from "@tauri-apps/api/path";

export class AppManager {
  public static shared = new AppManager();
  public COLLECTION_PATH = "data/collections";
  public TABLE_PATH = "data/tables";
  async initDataCollectionPath() {
    const { exists, createDir } = window.__TAURI__.fs;
    const isExists = await exists(this.COLLECTION_PATH, {
      dir: BaseDirectory.AppData,
    });
    if (!isExists) {
      console.info(`${this.COLLECTION_PATH} 目录不存在 ，新建该目录`);
      await createDir(this.COLLECTION_PATH, {
        dir: BaseDirectory.AppData,
        recursive: true,
      });
      console.info(`${this.COLLECTION_PATH} 目录新建成功`);
    }
    console.info(`${this.COLLECTION_PATH} 已存在`);
  }
}
