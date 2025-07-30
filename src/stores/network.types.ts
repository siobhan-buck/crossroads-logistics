export interface NetworkNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  primary?: boolean;
  root?: boolean;
  x?: number;
  y?: number;
}

export interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  weight: number;
}

export type NetworkData = {
  nodes: Array<NetworkNode>;
  links: Array<NetworkLink>;
};