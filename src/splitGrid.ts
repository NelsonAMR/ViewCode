import Split from "split-grid";

const $ = (selector: string) => document.querySelector(selector);

export default function splitGrid() {
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
}
