type Elements =
  | "li"
  | "h4"
  | "paragraph"
  | "span"
  | "flex"
  | "dialog"
  | "responsiveList"
  | "chartBar"
  | "menuItem";

const elementsDOMComponent = {
  li: document.createElement("li"),
  h4: document.createElement("h4"),
  paragraph: document.createElement("p"),
  span: document.createElement("span"),
  flex: document.createElement("custom-flex"),
  dialog: document.createElement("custom-dialog"),
  responsiveList: document.createElement("custom-list-holder"),
  chartBar: document.createElement("custom-chart-bar-horizontal"),
  menuItem: document.createElement("custom-menu-item"),
};

export const getElement = (elementName: Elements) =>
  elementsDOMComponent[elementName].cloneNode(true) as HTMLElement;
