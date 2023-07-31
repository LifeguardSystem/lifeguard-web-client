import { Monitor } from "../entity/group/group.interfaces.js";

export const hydrateGroupCardInfo = (params: {
  targetDOMElement: HTMLElement;
  monitors: Monitor[];
  monitorVisualizationCreator: (monitor: Monitor) => HTMLLIElement;
}) => {
  const { targetDOMElement, monitors, monitorVisualizationCreator } = params;

  targetDOMElement.innerHTML = "";

  const isEmpty = !monitors.length;
  if (isEmpty) {
    const emptyStateElement = document.createElement("custom-empty-state");
    return targetDOMElement.append(emptyStateElement);
  }

  const detailCard = document.createElement("custom-details-card");

  const monitorElementList = monitors.map((monitor) =>
    monitorVisualizationCreator(monitor)
  );

  detailCard.append(...monitorElementList);
  targetDOMElement.append(detailCard);
};
