import { v4 } from "uuid";

export class Node {
  constructor(
    public label: string,
    public readonly id: string = v4(),
  ) {}
}