import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { html, css, js } from "./decodeDoc";

const $ = (selector: string) => document.querySelector(selector);

const $html = $("#html") as HTMLDivElement;
const $css = $("#css") as HTMLDivElement;
const $js = $("#js") as HTMLDivElement;

window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    switch (label) {
      case "html":
        return new HtmlWorker();
      case "css":
        return new CssWorker();
      case "javascript":
        return new JsWorker();
      default:
        return new HtmlWorker();
    }
  },
};

const commonEditorOptions = {
  fontSize: 16,
  theme: "vs-dark",
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
};

export const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: "html",
  ...commonEditorOptions,
  wordWrap: "on",
});

export const cssEditor = monaco.editor.create($css, {
  value: css,
  language: "css",
  ...commonEditorOptions,
  wordWrap: "on",
});

export const jsEditor = monaco.editor.create($js, {
  value: js,
  language: "javascript",
  ...commonEditorOptions,
  wordWrap: "on",
});
