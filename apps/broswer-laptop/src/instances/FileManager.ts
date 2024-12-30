import { BaseDirectory } from "@tauri-apps/api/path";
import { isString } from "@/lib/is.ts";

export class FileManager {
  public static shared = new FileManager();
  async readDir(dirName: string, dir: BaseDirectory) {
    if (window.__TAURI__) {
      const { readDir } = window.__TAURI__.fs;
      return await readDir(dirName, { dir: dir, recursive: true });
    }
  }
  async readBinaryFile(fileName: string, dir: BaseDirectory) {
    if (window.__TAURI__) {
      const { readBinaryFile } = window.__TAURI__.fs;
      const unit8Array = await readBinaryFile(fileName, { dir: dir });
      return new TextDecoder().decode(unit8Array);
    }
  }
  async writeBinaryFile(fileName: string, content: any, dir: BaseDirectory) {
    if (window.__TAURI__) {
      const { writeBinaryFile } = window.__TAURI__.fs;
      const encoder = new TextEncoder();
      const stringData = isString(content) ? content : JSON.stringify(content);
      const uint8Array = encoder.encode(stringData);
      await writeBinaryFile(fileName, uint8Array, {
        dir: dir,
      });
      console.log("写入成功");
    }
  }
  async removeFile(file: string, dir: BaseDirectory) {
    if (window.__TAURI__) {
      const { removeFile } = window.__TAURI__.fs;
      await removeFile(file, {
        dir: dir,
      });
      console.log("删除成功");
    }
  }
}
