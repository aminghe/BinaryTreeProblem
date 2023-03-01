import { INode } from "../models/node";
export class Tree {
  root?: INode;
  maxDeep: number = 1;
  add(title: string) {
    if (this.root === undefined) {
      const rootNode: INode = {
        title: title,
        x: 800,
        y: 100,
        deep: 1,
      };
      this.root = rootNode;
      return;
    }

    let node = this.root;

    node = this.findEmptyLeafWithBFSApproach(node) ?? this.root;

    this.maxDeep = this.maxDeep > node.deep ? this.maxDeep : node.deep;

    if (!node.leftNode) {
      const newNode: INode = {
        title: title,
        x: node.x,
        y: node.y,
        deep: node.deep + 1,
      };
      node.leftNode = newNode;
      return;
    }

    if (!node.rightNode) {
      const newNode: INode = {
        title: title,
        x: node.x,
        y: node.y,
        deep: node.deep + 1,
      };
      node.rightNode = newNode;
    }
  }

  findEmptyLeafWithBFSApproach(node?: INode): INode | undefined {
    if (!node) return undefined;

    const queue: INode[] = [node];
    let findNode: INode | undefined = undefined;

    while (queue.length > 0) {
      const node = queue.pop();

      if (node?.leftNode) queue.unshift(node?.leftNode);
      if (node?.rightNode) queue.unshift(node?.rightNode);

      if (!node?.leftNode || !node?.rightNode) {
        findNode = node;
        break;
      }
    }
    return findNode;
  }

  nodes() {
    return this.root;
  }
}
