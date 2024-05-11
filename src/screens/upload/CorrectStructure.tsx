import { Edge } from '@/types/graph/Edge';
import { EdgeType } from '@/types/graph/EdgeType';
import { Graph } from '@/types/graph/Graph';
import { Node } from '@/types/graph/Node';
import React from 'react';
import { v4 } from 'uuid';

const CorrectStructure = () => {
  const correctStructure = React.useMemo(
    () => {
      const nodes = [...Array(3).keys()].map((num) => new Node(`Node-${num}`))
      const edges = [
        new Edge(nodes[0], nodes[1], 100, v4()),
        new Edge(nodes[0], nodes[1], 100, v4()),
        new Edge(nodes[0], nodes[1], 100, v4()),
        new Edge(nodes[1], nodes[2], 100, v4()),
        new Edge(nodes[2], nodes[0], 100, v4())
      ]
      const graph = new Graph(nodes, edges)

      return JSON.stringify(graph, null, 2)
    },
    []
  )

  return (
    <div>
      <p>Файл, содержащий информацию о файле, обязательно должен иметь формат <b>JSON</b> и содержать следующие поля:</p>
      <ul>
        <li>
          <b>nodes: {`Array<Node>`}</b> - массив вершин графа. Структура объекта Node имеет следующий вид:<br/>
          <code>{`{\nid: "471a184c-e32e-4478-982b-ce30d891b54a", label: "Node-0"}`}</code>
          <ul>
            <li><b>id</b> - уникальный идентификатор объекта (string)</li>
            <li><b>label</b> - название вершины (string)</li>
          </ul>
        </li>
        <li>
          <b>edges: {`Array<Edge<T>>`}</b> - массив вершин графа. Структура объекта Edge:<br/>
          <code>{`{\nid: "471a184c-e32e-4478-982b-ce30d891b54b", source: Node, destination: Node, weight: 100, type: NOT_DIRECTED}`}</code>
          <ul>
            <li><b>id</b> - уникальный идентификатор объекта (string)</li>
            <li><b>source</b> - вершина, из которой выходит ребро (Node)</li>
            <li><b>destination</b> - вершина, в которую входит ребро (Node)</li>
            <li><b>weight</b> - вес ребра (имеет тип <b>T</b>)</li>
            <li><b>type</b> - тип ребра (имеет направление (<b>ORIENTED</b>) или нет (<b>NOT_DIRECTED</b>))</li>
          </ul>
        </li>
      </ul>
      <p>Пример правильной структуры файла:</p>
      <textarea name="prop" id="prop" className='w-full h-80 resize-none p-2' value={correctStructure} readOnly/>
    </div>
  );
};

export default CorrectStructure;