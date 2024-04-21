import EdgeShort from "@/components/EdgeShort";
import NodeShort from "@/components/NodeShort";
import { Edge } from "@/types/graph/Edge";
import { Node } from "@/types/graph/Node";

interface ResultReportProps {
  nodes: Node[],
  edges: Edge<number>[]
}

function ResultReport({ nodes, edges }: ResultReportProps) {
  return (
    <div className="flex flex-col">
      <span>Количество вершин: <b>{nodes.length}</b></span>
      <span>Количество рёбер: <b>{edges.length}</b></span>
      <div className="w-full bg-gray-200 h-0.5 my-2"/>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="block space-y-2 flex-1">
          <b>Все считанные вершины:</b>
          {
            nodes.map((node) => (
              <NodeShort key={node.id} node={node}/>
            ))
          }
        </div>
        <div className="block space-y-2 flex-1">
          <b>Все считанные ребра:</b>
          {
            edges.map((edge) => (
              <EdgeShort key={edge.id} edge={edge}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default ResultReport;