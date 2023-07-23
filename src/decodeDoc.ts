import { decode } from "js-base64";

const { pathname } = window.location;
const [rawHtml, rawCss, rawJs] = pathname.slice(1).split("%7C");

export const html = rawHtml ? decode(rawHtml) : "";
export const css = rawCss ? decode(rawCss) : "";
export const js = rawJs ? decode(rawJs) : "";
