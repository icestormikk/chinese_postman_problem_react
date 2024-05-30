import { Edge } from "@/types/graph/Edge";
import PathEdge from "./PathEdge";
import { useAppSelector } from "@/libs/redux/hooks";
import React from "react";

interface PathWidgetProps {
  path: Array<Edge<number>>
}

const PathWidget = ({ path }: PathWidgetProps) => {
  const { edges } = useAppSelector((state) => state.graph)
  const [pathString, setPathString] = React.useState<string>()
  const [missedEdges, setMissedEdges] = React.useState<Edge<number>[]>([])

  const isAllEdgesVisited = React.useCallback(
    () => {
      for (const edge of edges) {
        if (path.find((e) => e.id === edge.id) == undefined) {
          setMissedEdges((prevState) => [...(prevState || []), edge])
        }
      }

      return missedEdges.length === 0
    },
    [edges, path]
  )

  React.useEffect(
    () => {
      let res = [path[0].source, path[0].destination]
      for (let i = 1; i < path.length; i++) {
        if (path[i].source.id === res.at(-1)!.id) {
          res.push(path[i].destination)
        } else {
          res.push(path[i].source)
        }
      }

      setPathString(res.map((n) => n.label).join(' -> '))
    },
    [path]
  )

  return (
    <div className="space-y-2 my-6 flex flex-col">
      <b>Оптимальный путь: </b>
      {
        path.map((edge, index) => (
          <PathEdge key={index} index={index + 1} edge={edge}/>
        ))
      }
      { pathString && <b>{pathString}</b> }
      <b>{`Общая длина пути: ${path.map((edge) => edge.weight).reduce((a, b) => a + b, 0)}`}</b>
      <b>{`Все рёбра посещены? - ${isAllEdgesVisited() ? 'Да' : 'Нет'}`}</b>
      {
        missedEdges.length > 0 && (
          missedEdges.map((edge, index) => (
            <PathEdge key={index} index={index + 1} edge={edge}/>
          ))
        )
      }
    </div>
  );
};

export default PathWidget