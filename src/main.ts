import "./style.css";

const $ = (selector: string) => document.querySelector(selector);

const $html = $("#html") as HTMLTextAreaElement;
const $css = $("#css") as HTMLTextAreaElement;
const $js = $("#js") as HTMLTextAreaElement;

$html?.addEventListener("input", update);
$css?.addEventListener("input", update);
$js?.addEventListener("change", update);

function update() {
  const html = createHtml();
  $("iframe")?.setAttribute("srcdoc", html);
}

function createHtml() {
  const html = $html?.value;
  const css = $css?.value;
  const js = $js?.value;

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
