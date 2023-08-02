import * as Type from "../entity/group/group.interfaces.js";
import { getElement } from "../util/dom-elements.js";

const createDialogAndItsButtons = (dialogTextContent: string) => {
  const dialogElement = getElement("dialog");
  const dialogContent = getElement("paragraph");

  dialogContent.innerText = dialogTextContent;

  dialogElement.setAttribute("btnText", "Ver definição do monitoramento");

  dialogElement.append(dialogContent);

  return dialogElement;
};

const createTitle = (titleTextContent: string) => {
  const titleElement = getElement("h4");

  titleElement.innerText = titleTextContent;

  return titleElement;
};

const createAddOnWrapper = (items: HTMLElement[]) => {
  const list = getElement("li");

  list.append(...items);
  return list;
};

export const createMonitorVisualization = (
  monitor: Type.Monitor,
  addOnContentCreator: {
    [key in Type.Monitoring]: (
      content: Type.MonitoringMessage[]
    ) => HTMLElement[];
  }
) => {
  const { description, name } = monitor;

  const listElement = getElement("li");
  const monitorComponent = getElement("flex");

  const dialog = createDialogAndItsButtons(description);
  const title = createTitle(name);

  monitorComponent.append(title, dialog);
  listElement.append(monitorComponent);

  const addOnsName = Object.keys(monitor?.content || {}) as Type.Monitoring[];
  if (addOnsName?.length) {
    addOnsName.forEach((addOn) => {
      const content = monitor.content[addOn];

      const addOnWrapped = createAddOnWrapper(
        addOnContentCreator[addOn](content)
      );

      listElement.append(addOnWrapped);
    });
  }

  return listElement;
};
