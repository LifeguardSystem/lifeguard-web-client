import { MonitoringMessage } from "../entity/group/group.interfaces.js";
import { getElement } from "../util/domElements.js";
import { toPercentage } from "../util/to-percentage.js";

export class AddOn {
  action = (action: MonitoringMessage[]) =>
    action.map((item) => {
      const btn = getElement("anchorAsButton");
      btn.innerText = item.description;
      btn.setAttribute("href", item.linkTo);

      return btn;
    });

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

        bar.setAttribute("title", item.description);

        return bar;
      });
  };
}
