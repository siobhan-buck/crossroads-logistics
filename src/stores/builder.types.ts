export interface WebNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  root?: boolean;
  health?: boolean;
  x?: number;
  y?: number;
}

export interface WebLink extends d3.SimulationLinkDatum<WebNode> {
  weight: number;
}

export type SkillData = {
  id: number;
  name: string;
  talents: Array<number>;
  description: string;
  cost: number;
}

export type EpisodesData = {
  episode: number;
  talents: number;
  skills: number;
}