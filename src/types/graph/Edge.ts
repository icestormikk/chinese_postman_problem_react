import { v4 } from "uuid";
import { EdgeType } from "./EdgeType";
import { Node } from "./Node";

export class Edge<T> {
  constructor(
    public source: Node,
    public destination: Node,
    public weight: T,
    public type: EdgeType,
    public readonly id: string = v4()
  ) {}
}