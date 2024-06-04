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

  public getCommonNode(startEdge: Edge<number>, endEdge: Edge<number>) {
    switch (startEdge.type) {
      case EdgeType.NOT_ORIENTED: {
        switch (endEdge.type) {
            case EdgeType.NOT_ORIENTED: {
              const startEdgeNodes = [...new Set([startEdge.source, startEdge.destination])]
              const endEdgeNodes = [...new Set([endEdge.source, endEdge.destination])]
              const intersection = startEdgeNodes.filter((n) => endEdgeNodes.includes(n))
              return intersection.at(0)
            }
            case EdgeType.DIRECTED: {
              const startEdgeNodes = [...new Set([startEdge.source, startEdge.destination])]
              const endEdgeNodes = [endEdge.source]
              const intersection = startEdgeNodes.filter((n) => endEdgeNodes.includes(n))
              return intersection.at(0)
            }
          }
        }
      case EdgeType.DIRECTED: {
        switch (endEdge.type) {
          case EdgeType.NOT_ORIENTED: {
            const startEdgeNodes = [startEdge.destination]
            const endEdgeNodes = [...new Set([endEdge.source, endEdge.destination])]
            const intersection = startEdgeNodes.filter((n) => endEdgeNodes.includes(n))
            return intersection.at(0)
          }
          case EdgeType.DIRECTED: {
            return startEdge.destination
          }
        }
      }
    }
  }

  public pathToNodeString(path: Array<Edge<number>>, startNode: Node): string {
    const nodes = [startNode]
    for (let i = 0; i < path.length - 1; i++) {
      const commonNode = this.getCommonNode(path[i], path[i+1])
      if (!commonNode) {
        return ""
      }

      nodes.push(commonNode)
    }
    nodes.push(startNode)

    return nodes.map((n) => n.label).join("->")
  }
}
