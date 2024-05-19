import { Edge } from "./Edge";
import { EdgeType } from "./EdgeType";
import { Node } from "./Node";

export class Graph<T> {
  constructor(
    public nodes: Node[],
    public edges: Edge<T>[]
  ) {}

  public getEdgesFrom(node: Node): Array<Edge<T>> {
    return this.edges.filter((edge) =>
      (edge.type === EdgeType.DIRECTED && edge.source.id === node.id) ||
      (edge.type === EdgeType.NOT_ORIENTED && (edge.source.id === node.id || edge.destination.id === node.id))
    )
  }
}
