import type * as TauriAPI from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/path";
interface FsDirOptions {
  dir?: BaseDirectory;
  recursive?: boolean;
}
interface FileEntry {
  path: string;
  name?: string;
  children?: FileEntry[];
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
type BinaryFileContents = Iterable<number> | ArrayLike<number> | ArrayBuffer;
declare global {
  interface Window {
    __TAURI__: typeof TauriAPI & {
      fs: {
        createDir: (dir: string, options: FsDirOptions) => Promise<void>;
        readDir: (path: string, options: FsDirOptions) => Promise<FileEntry[]>;
        exists: (path: string, options: FsOptions) => Promise<boolean>;
        writeBinaryFile: (
          path: string,
          contents: BinaryFileContents,
          options?: FsOptions,
        ) => Promise<void>;
        readBinaryFile: (
          path: string,
          options?: FsOptions,
        ) => Promise<Uint8Array>;
        removeFile: (file: string, options?: FsOptions) => Promise<void>;
      };
    };
  }
}
