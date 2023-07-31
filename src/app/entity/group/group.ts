import { Monitor, Status } from "./group.interfaces.js";

export class Group {
  name: string;
  #monitors?: Monitor[];

  constructor(groupName: string) {
    this.name = groupName;
    this.#monitors = [];
  }

  setMonitor(monitor: Monitor) {
    const ids = this.#findMonitorsIDs();

    const isAlreadySaved = ids.includes(monitor.id);

    if (!isAlreadySaved) {
      this.#monitors.push(monitor);
      return this;
    }

    this.#monitors = this.#monitors.map((savedMonitor) => {
      const isTheSame = savedMonitor.id === monitor.id;
      return isTheSame ? monitor : savedMonitor;
    });

    return this;
  }

  getMonitorsByStatus = (status: Status) =>
    this.#monitors?.filter((monitor) => monitor.status === status);

  #findMonitorsIDs = () => this.#monitors?.map((monitor) => monitor.id);
}
