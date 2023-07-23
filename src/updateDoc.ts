import { encode } from "js-base64";
import { htmlEditor, cssEditor, jsEditor } from "./editorConfig";
import createDoc from "./createDoc";

const $ = (selector: string) => document.querySelector(selector);

export default function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const hashedCode = `${encode(html)}${css && "|"}${encode(css)}${
    js && "|"
  }${encode(js)}`;

  window.history.pushState(null, "", `/${hashedCode}`);

  const doc = createDoc(html, css, js);
  $("iframe")?.setAttribute("srcdoc", doc);
}
