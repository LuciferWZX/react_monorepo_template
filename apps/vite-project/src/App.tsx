import { useMemo, useState } from "react";

import { VanillaJSONEditor } from "@/VanillaJSONEditor.tsx";
import "vanilla-jsoneditor/themes/jse-theme-dark.css";
import { Content } from "vanilla-jsoneditor";
import ValidateSchemaContent from "@/ValidateSchemaContent.tsx";
const App = () => {
  const [content, setContent] = useState<Content>({
    // json: {
    //   greeting: "Hello World",
    //   color: "#ff3e00",
    //   ok: true,
    //   values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    // },
    json: [
      {
        type: "string",
        uniqId: "001",
        value: "1",
        pattern: "dwdwdw",
        maxLength: 2,
        minLength: 2,
      },
      {
        type: "integer",
        uniqId: "002",
        value: 2.1,
        pattern: "dwdwdw",
        maximum: 2,
      },
      {
        type: "number",
        uniqId: "003",
        value: 2.1,
        pattern: "dwdwdw",
        maximum: 2,
      },
    ],
  });
  const mergedContent = useMemo(() => {
    const _content = content as any;
    if (_content.text) {
      try {
        return JSON.parse(_content.text);
      } catch {
        return {};
      }
    }
    return _content.json;
  }, [content]);

  return (
    <div className={"h-screen flex"}>
      <div className={"jse-theme-dark flex-1 overflow-auto"}>
        <VanillaJSONEditor content={content} onChange={setContent} />
      </div>
      <div className={"flex-1"}>
        <ValidateSchemaContent content={mergedContent} />
      </div>
    </div>
  );
};
export default App;
