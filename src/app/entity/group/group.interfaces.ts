export type Status = "problem" | "warning" | "normal";

export type MonitoringMessage = {
  description: string;
  value?: number;
};

export type Action = {
  description: string;
  linkTo?: string;
};

export type Monitoring = "gauge" | "queue" | "generic";

export type Monitor = {
  id: string;
  status: Status;
  name: string;
  description: string;
  actions?: Action[];
} & {
  [key in Monitoring]?: MonitoringMessage[];
};
