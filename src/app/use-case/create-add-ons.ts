import { MonitoringMessage } from "../entity/group/group.interfaces.js";
import { getElement } from "../util/domElements.js";
import { toPercentage } from "../util/to-percentage.js";

export class AddOn {
  action = (action: MonitoringMessage[]) => [getElement("span")];

  generic = (generic: MonitoringMessage[]) =>
    generic.map((item) => {
      const paragraph = getElement("paragraph");
      paragraph.innerText = item.description;

      return paragraph;
    });

  queue = (queue: MonitoringMessage[]) => {
    const biggestQueueVolume = Math.max(...queue.map((item) => item.value));

    return queue
      .sort((a, b) => b?.value - a?.value)
      .map((item) => {
        const bar = getElement("chartBar");
        bar.setAttribute("value", String(item?.value));

        const percentage = toPercentage(biggestQueueVolume, item.value).raw;
        bar.setAttribute("percentage", String(percentage));

        const itemContent = getElement("span");
        itemContent.innerText = item.description;

        bar.append(itemContent);

        return bar;
      });
  };
}
