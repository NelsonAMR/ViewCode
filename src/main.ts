import createDoc from "./createDoc";
import { htmlEditor, cssEditor, jsEditor } from "./editorConfig";
import { html, css, js } from "./decodeDoc";
import update from "./updateDoc";
import splitGrid from "./splitGrid";

splitGrid();

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidBlurEditorText(update);

const buildDoc = createDoc(html, css, js);

document.querySelector("iframe")?.setAttribute("srcdoc", buildDoc);
