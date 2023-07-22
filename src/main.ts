import Split from "split-grid";
import { encode, decode } from "js-base64";

import "./style.css";

const $ = (selector: string) => document.querySelector(selector);

const $html = $("#html") as HTMLTextAreaElement;
const $css = $("#css") as HTMLTextAreaElement;
const $js = $("#js") as HTMLTextAreaElement;

document.addEventListener("DOMContentLoaded", init);

$html?.addEventListener("input", update);
$css?.addEventListener("input", update);
$js?.addEventListener("change", update);

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

function init() {
  const { pathname } = window.location;
  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C");

  const html = decode(rawHtml);
  const css = decode(rawCss);
  const js = decode(rawJs);

  $html.value = html;
  $css.value = css;
  $js.value = js;

  const docPrev = createHtml(html, css, js);
  $("iframe")?.setAttribute("srcdoc", docPrev);
}

function update() {
  const html = $html?.value;
  const css = $css?.value;
  const js = $js?.value;

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;

  if (hashedCode) {
    window.history.replaceState(null, "", `/${hashedCode}`);
  }

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
