/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
// import "monaco-editor/esm/vs/editor/editor.worker.js"
(self as any).MonacoEnvironment = {
  getWorkerUrl: () => "./editor.worker.js",
};
