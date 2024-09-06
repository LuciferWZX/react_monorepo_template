import { ReactMonacoEditor, useMonaco } from "@zhixin/monaco_editor";
import { useEffect } from "react";
// import "@zhixin/monaco_editor/src/userWoker.ts";
function App() {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  return (
    <div className={"h-screen w-screen overflow-auto p-2"}>
      <ReactMonacoEditor
        language="python"
        theme="vs-dark"
        width={600}
        height={600}
        options={{
          wordBasedSuggestionsOnlySameLanguage: true,
          automaticLayout: true,
          autoDetectHighContrast: true,
          foldingHighlight: true,
          copyWithSyntaxHighlighting: true,
          colorDecorators: true,
          minimap: {
            enabled: true,
          },
        }}
      />
    </div>
  );
}

export default App;
