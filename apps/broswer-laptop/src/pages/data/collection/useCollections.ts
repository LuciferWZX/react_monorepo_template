import { FileManager } from "@/instances/FileManager.ts";
import { AppManager } from "@/instances/AppManager.ts";
import { BaseDirectory } from "@tauri-apps/api/path";
import { DataFileType } from "@/lib/template.ts";
import { useState } from "react";
import { useRequest } from "ahooks";

export const useCollections = () => {
  const [templates, setTemplate] = useState<DataFileType[]>([]);
  const getCollections = async () => {
    const templates: DataFileType[] = [];
    const entries = await FileManager.shared.readDir(
      AppManager.shared.COLLECTION_PATH,
      BaseDirectory.AppData,
    );
    if (!entries) {
      return templates;
    }

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const contents = await FileManager.shared.readBinaryFile(
        `${AppManager.shared.COLLECTION_PATH}/${entry.name}`,
        BaseDirectory.AppData,
      );
      if (contents) {
        templates.push(JSON.parse(contents));
      }
    }
    return templates;
  };
  const { refresh, loading } = useRequest(getCollections, {
    onSuccess: (data) => {
      setTemplate(data);
    },
    onError: (e) => {
      console.log("[getCollections]:", e.message);
    },
  });
  return {
    getCollections,
    refreshCollections: refresh,
    loading,
    templates,
  };
};
