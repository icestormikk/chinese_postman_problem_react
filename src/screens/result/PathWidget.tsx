import { Edge } from "@/types/graph/Edge";
import PathEdge from "./PathEdge";

interface PathWidgetProps {
  path: Array<Edge<number>>
}

const PathWidget = ({ path }: PathWidgetProps) => {
  return (
    <div className="space-y-2 my-6">
      <b>Оптимальный путь: </b>
      {
        path.map((edge, index) => (
          <PathEdge key={index} index={index + 1} edge={edge}/>
        ))
      }
      <b>{`Общая длина пути: ${path.map((edge) => edge.weight).reduce((a, b) => a + b, 0)}`}</b>
    </div>
  );
};

export default PathWidget