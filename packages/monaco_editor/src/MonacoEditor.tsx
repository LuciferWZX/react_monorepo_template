// import * as monaco from "monaco-editor";
import { ComponentPropsWithoutRef } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  CloseAction,
  ErrorAction,
  MessageTransports,
} from "vscode-languageclient";
import { MonacoLanguageClient } from "monaco-languageclient";
import { useWorkerFactory } from "monaco-editor-wrapper/workerFactory";
// import "./useWorker.ts";
// eslint-disable-next-line @typescript-eslint/no-require-imports
// import ReconnectingWebSocket from "reconnecting-websocket";
import getThemeServiceOverride from "@codingame/monaco-vscode-theme-service-override";
import getTextmateServiceOverride from "@codingame/monaco-vscode-textmate-service-override";
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from "vscode-ws-jsonrpc";
import { initServices } from "monaco-languageclient/vscode/services";
// const ReconnectingWebSocket = require("reconnecting-websocket");

type ReactMonacoEditorProps = ComponentPropsWithoutRef<typeof Editor>;
const ReactMonacoEditor = (props: ReactMonacoEditorProps) => {
  const { ...restProps } = props;
  useWorkerFactory({
    ignoreMapping: true,
    workerLoaders: {
      editorWorkerService: () =>
        new Worker(
          new URL(
            "monaco-editor/esm/vs/editor/editor.worker.js",
            import.meta.url,
          ),
          { type: "module" },
        ),
    },
  });
  const willMount = async (monaco: Monaco) => {
    console.log("mount");
    await initServices({
      serviceConfig: {
        userServices: {
          ...getThemeServiceOverride(),
          ...getTextmateServiceOverride(),
        },
        debugLogging: true,
      },
    });
    // register Monaco languages
    monaco.languages.register({
      id: "python",
      extensions: [".python", ".py", ".pyd"],
      aliases: ["Python", "python"],
      mimetypes: ["application/json"],
    });

    initWebSocketAndStartClient("ws://127.0.0.1:30001");
  };

  const createLanguageClient = (
    transports: MessageTransports,
  ): MonacoLanguageClient => {
    return new MonacoLanguageClient({
      id: "python",
      name: "Python Language Server Example",
      clientOptions: {
        // use a language id as a document selector
        documentSelector: ["python"],
        // disable the default error handler
        errorHandler: {
          error: () => ({ action: ErrorAction.Continue }),
          closed: () => ({ action: CloseAction.DoNotRestart }),
        },
      },
      // create a language client connection from the JSON RPC connection on demand
      connectionProvider: {
        get: () => {
          return Promise.resolve(transports);
        },
      },
    });
  };
  const initWebSocketAndStartClient = (url: string): WebSocket => {
    const webSocket = new WebSocket(url);
    webSocket.onopen = () => {
      const socket = toSocket(webSocket);
      const reader = new WebSocketMessageReader(socket);
      const writer = new WebSocketMessageWriter(socket);
      const languageClient = createLanguageClient({
        reader,
        writer,
      });
      languageClient.start();
      reader.onClose(() => languageClient.stop());
    };
    return webSocket;
  };

  // function createWebSocket(url: string): WebSocket {
  //   const socketOptions = {
  //     maxReconnectionDelay: 10000,
  //     minReconnectionDelay: 1000,
  //     reconnectionDelayGrowFactor: 1.3,
  //     connectionTimeout: 10000,
  //     maxRetries: Infinity,
  //     debug: false,
  //   };
  //   // eslint-disable-next-line @typescript-eslint/no-require-imports
  //   // const ReconnectingWebSocket = require("reconnecting-websocket");
  //   return new ReconnectingWebSocket(url, [], socketOptions);
  // }
  return <Editor onMount={(_, monaco) => willMount(monaco)} {...restProps} />;
};
export default ReactMonacoEditor;
