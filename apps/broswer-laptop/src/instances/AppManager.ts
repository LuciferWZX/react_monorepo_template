import { BaseDirectory } from "@tauri-apps/api/path";

export class AppManager {
  public static shared = new AppManager();

  async initDataCollectionPath() {
    const { exists, createDir } = window.__TAURI__.fs;
    const COLLECTION_PATH = "data/collections";
    const isExists = await exists(COLLECTION_PATH, {
      dir: BaseDirectory.AppData,
    });
    if (!isExists) {
      console.info(`${COLLECTION_PATH} 目录不存在 ，新建该目录`);
      await createDir("data/collections", {
        dir: BaseDirectory.AppData,
        recursive: true,
      });
      console.info(`${COLLECTION_PATH} 目录新建成功`);
    }
    console.info(`${COLLECTION_PATH} 已存在`);
  }
}
