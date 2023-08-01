export type Status = "problem" | "warning" | "normal";

export type MonitoringMessage = {
  description: string;
  value?: number;
  linkTo?: string;
};

export type Monitoring = "queue" | "generic" | "action";

export type Monitor = {
  id: string;
  status: Status;
  name: string;
  description: string;
  content?: {
    [key in Monitoring]?: MonitoringMessage[];
  };
};
