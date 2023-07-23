import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import Split from "split-grid";
import { encode, decode } from "js-base64";

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

Split({
  columnGutters: [
    {
      track: 1,
      element: $(".gutter-col-1") as HTMLDivElement,
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: $(".gutter-row-1") as HTMLDivElement,
    },
  ],
});

const { pathname } = window.location;
const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C");

const html = rawHtml ? decode(rawHtml) : "";
const css = rawCss ? decode(rawCss) : "";
const js = rawJs ? decode(rawJs) : "";

const commonEditorOptions = {
  fontSize: 16,
  theme: "vs-dark",
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
};

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: "html",
  ...commonEditorOptions,
  wordWrap: "on",
});

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: "css",
  ...commonEditorOptions,
  wordWrap: "on",
});

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: "javascript",
  ...commonEditorOptions,
  wordWrap: "on",
});

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidBlurEditorText(update);

const docPrev = createHtml(html, css, js);
$("iframe")?.setAttribute("srcdoc", docPrev);

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const hashedCode = `${encode(html)}${css && "|"}${encode(css)}${
    js && "|"
  }${encode(js)}`;

  window.history.pushState(null, "", `/${hashedCode}`);

  const doc = createHtml(html, css, js);
  $("iframe")?.setAttribute("srcdoc", doc);
}

function createHtml(html: string, css: string, js: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>
`;
}
