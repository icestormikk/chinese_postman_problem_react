import { Node } from "./Node";

export class Edge<T> {
  constructor(
    public source: Node,
    public destination: Node,
    public weight: T,
    public readonly id: string
  ) {}
}