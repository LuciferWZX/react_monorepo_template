import type * as TauriAPI from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/path";
interface FsDirOptions {
  dir?: BaseDirectory;
  recursive?: boolean;
}
interface FsOptions {
  dir?: BaseDirectory;
  /**
   * Whether the content should overwrite the content of the file or append to it.
   *
   * @since 1.5.0
   */
  append?: boolean;
  // note that adding fields here needs a change in the writeBinaryFile check
}
declare global {
  interface Window {
    __TAURI__: typeof TauriAPI & {
      fs: {
        createDir: (dir: string, options: FsDirOptions) => Promise<void>;
        exists: (path: string, options: FsOptions) => Promise<boolean>;
      };
    };
  }
}
