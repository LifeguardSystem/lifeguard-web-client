import { Monitor, Status } from "../entity/group/group.interfaces.js";

export const hydrateGroupCardInfo = (params: {
  targetDOMElement: HTMLElement;
  monitors: Monitor[];
}) => {
  const { targetDOMElement, monitors } = params;

  targetDOMElement.innerHTML = "";

  const isEmpty = !monitors.length;
  if (isEmpty) {
    const emptyStateElement = document.createElement("custom-empty-state");
    return targetDOMElement.append(emptyStateElement);
  }

  const detailCard = document.createElement("custom-details-card");

  const monitorElementList = monitors.map((monitor) => {
    const listElement = document.createElement("li");
    const monitorComponent = document.createElement("custom-flex");
    const titleElement = document.createElement("h4");
    const dialogElement = document.createElement("custom-dialog");
    const dialogContent = document.createElement("p");

    titleElement.innerText = monitor.name;
    dialogContent.innerText = monitor.description;

    dialogElement.setAttribute("btnText", "Ver definição do monitoramento");

    dialogElement.append(dialogContent);
    monitorComponent.append(titleElement, dialogElement);
    listElement.append(monitorComponent);
    return listElement;
  });

  detailCard.append(...monitorElementList);
  targetDOMElement.append(detailCard);

  console.log(monitors);
};
