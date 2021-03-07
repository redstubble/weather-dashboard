export type CanvasType = {
  // dataset: {
  //   key: string;
  //   values: any;
  //   value: any;
  // }[];
  node: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  x: number;
  y: number;
};

export const defaultCanvas = {
  top: 25,
  right: 10,
  bottom: 25,
  left: 50,
};
