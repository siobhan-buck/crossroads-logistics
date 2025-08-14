export interface WebNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  root?: boolean;
  x?: number;
  y?: number;
}

export interface WebLink extends d3.SimulationLinkDatum<WebNode> {
  weight: number;
}

export type WebData = {
  nodes: Array<WebNode>;
  links: Array<WebLink>;
};

export type SkillData = {
  id: number;
  name: string;
  talents: Array<number>;
  description: string;
  cost: number;
}

export type PointsData = {
  episode: number;
  talents: number;
  skills: number;
}