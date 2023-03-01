export interface INode {
  x: number;
  y: number;
  deep: number;
  title: string;
  leftNode?: INode;
  rightNode?: INode;
}
