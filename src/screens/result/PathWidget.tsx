import { Edge } from "@/types/graph/Edge";
import PathEdge from "./PathEdge";
import { useAppSelector } from "@/libs/redux/hooks";
import React from "react";

interface PathWidgetProps {
  path: Array<Edge<number>>
}

const PathWidget = ({ path }: PathWidgetProps) => {
  const { edges } = useAppSelector((state) => state.graph)

  const isAllEdgesVisited = React.useCallback(
    () => {
      for (const edge of edges) {
        if (path.find((e) => e.id === edge.id) == undefined) {
          return false
        }
      }

      return true
    },
    [edges, path]
  )

  return (
    <div className="space-y-2 my-6 flex flex-col">
      <b>Оптимальный путь: </b>
      {
        path.map((edge, index) => (
          <PathEdge key={index} index={index + 1} edge={edge}/>
        ))
      }
      <b>{`Общая длина пути: ${path.map((edge) => edge.weight).reduce((a, b) => a + b, 0)}`}</b>
      <b>{`Все рёбра посещены? - ${isAllEdgesVisited() ? 'Да' : 'Нет'}`}</b>
    </div>
  );
};

export default PathWidget