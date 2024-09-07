import { ComponentPropsWithoutRef, useEffect } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from "vscode-ws-jsonrpc";
import {
  CloseAction,
  ErrorAction,
  MessageTransports,
  MonacoLanguageClient,
  MonacoServices,
} from "monaco-languageclient";
import normalizeUrl from "normalize-url";
import * as ReconnectingWebSocket from "reconnecting-websocket";
type ReactMonacoEditorProps = ComponentPropsWithoutRef<typeof Editor>;
const ReactMonacoEditor = (props: ReactMonacoEditorProps) => {
  const { ...restProps } = props;
  function createLanguageClient(
    transports: MessageTransports,
  ): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: "PYLS Language Client",
      clientOptions: {
        documentSelector: ["python"],
        errorHandler: {
          error: () => ({ action: ErrorAction.Continue }),
          closed: () => ({ action: CloseAction.DoNotRestart }),
        },
      },
      connectionProvider: {
        get: () => {
          return Promise.resolve(transports);
        },
      },
    });
  }

  const willMount = (monaco: Monaco) => {
    monaco.languages.register({
      id: "python",
      extensions: [".py"],
      aliases: ["PYTHON", "python", "py"],
    });

    MonacoServices.install();
  };
  useEffect(() => {
    console.log("Creating websocket");
    const url = normalizeUrl(`ws://localhost:5000`);
    const socketOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false,
    };
    const webSocket = new ReconnectingWebSocket.default(url, [], socketOptions);

    webSocket.onopen = () => {
      const socket = toSocket(webSocket as never);
      const reader = new WebSocketMessageReader(socket);
      const writer = new WebSocketMessageWriter(socket);
      const languageClient = createLanguageClient({
        reader,
        writer,
      });
      languageClient.start();
      reader.onClose(() => languageClient.stop());
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return <Editor onMount={(_, monaco) => willMount(monaco)} {...restProps} />;
};
export default ReactMonacoEditor;
