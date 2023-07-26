import { Monitor, Status } from "./group.interfaces.js";

export class Group {
  name: string;
  #monitors?: Monitor[];

  constructor(groupName: string) {
    this.name = groupName;
    this.#monitors = [];
  }

  setMonitor(monitor: Monitor) {
    const ids = this.#getMonitorsIDs();

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
    this.#monitors?.find((monitor) => monitor.status === status);

  #getMonitorsIDs = () => this.#monitors?.map((monitor) => monitor.id);
}
