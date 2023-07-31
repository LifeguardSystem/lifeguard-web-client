import { Monitor, MonitoringMessage } from "../entity/group/group.interfaces";

const elements = {
  li: document.createElement("li"),
  flex: document.createElement("custom-flex"),
  h4: document.createElement("h4"),
  dialog: document.createElement("custom-dialog"),
  paragraph: document.createElement("p"),
  responsiveList: document.createElement("custom-list-holder"),
};

const createDialogAndItsButtons = (dialogTextContent: string) => {
  const { dialog, paragraph } = elements;

  const dialogElement = dialog.cloneNode(true) as HTMLElement;
  const dialogContent = paragraph.cloneNode(true) as HTMLParagraphElement;

  dialogContent.innerText = dialogTextContent;

  dialogElement.setAttribute("btnText", "Ver definição do monitoramento");

  dialogElement.append(dialogContent);

  return dialogElement;
};

const createTitle = (titleTextContent: string) => {
  const { h4 } = elements;
  const titleElement = h4.cloneNode(true) as HTMLTitleElement;

  titleElement.innerText = titleTextContent;

  return titleElement;
};

const createAddOnForGenericList = (generic: MonitoringMessage[]) => {
  const { responsiveList, paragraph } = elements;

  const list = responsiveList.cloneNode(true) as HTMLElement;

  const items = generic.map((item) => {
    const itemContent = paragraph.cloneNode(true) as HTMLParagraphElement;
    itemContent.innerText = item.description;

    return itemContent;
  });

  list.append(...items);
  return list;
};

export const createMonitorVisualization = (monitor: Monitor) => {
  const { description, name } = monitor;
  const { li, flex } = elements;

  const listElement = li.cloneNode(true) as HTMLLIElement;
  const monitorComponent = flex.cloneNode(true) as HTMLElement;

  const dialog = createDialogAndItsButtons(description);
  const title = createTitle(name);

  monitorComponent.append(title, dialog);
  listElement.append(monitorComponent);

  if (monitor?.generic?.length) {
    const generic = createAddOnForGenericList(monitor.generic);
    listElement.append(generic);
  }

  return listElement;
};
