import { Edge } from "./Edge";
import { Node } from "./Node";

export class Graph<T> {
  constructor(
    public nodes: Node[],
    public edges: Edge<T>[]
  ) {}
}
