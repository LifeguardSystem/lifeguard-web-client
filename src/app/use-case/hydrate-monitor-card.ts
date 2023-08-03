import { getElement } from "../util/dom-elements.js";

export const hydrateMonitorCard = (
  cardDOMElement: HTMLElement,
  isEmpty: boolean,
  monitorsByGroupsList: {
    name?: string;
    id?: string;
    monitorList: HTMLElement[];
  }[]
) => {
  cardDOMElement.innerHTML = "";

  if (isEmpty) {
    const emptyStateElement = document.createElement("custom-empty-state");
    return cardDOMElement.append(emptyStateElement);
  }

  const detailsCardList = monitorsByGroupsList.map((group) => {
    const detailsCard = getElement("detailsCard");
    detailsCard.append(...group.monitorList);

    if (group.name) {
      detailsCard.setAttribute("title", group.name);
      detailsCard.setAttribute("href", `/group/?name=${group.id}`);
      detailsCard.setAttribute("home", "true");
    }

    return detailsCard;
  });

  cardDOMElement.append(...detailsCardList);
};
