import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { selectNodeById } from '@/libs/redux/slices/graphSlice';
import { EdgeType } from '@/types/graph/EdgeType';
import { Node } from '@/types/graph/Node';
import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';

function Graph() {
  const dispatch = useAppDispatch()
  const { edges, nodes, selectedNodes } = useAppSelector((state) => state.graph)
  const [graphNodes, setGraphNodes] = React.useState<any[]>([])
  const [graphEdges, setGraphEdges] = React.useState<any[]>([])
  const [graphWidth, setGraphWidth] = React.useState(window.innerWidth)
  const [graphHeight, setGraphHeight] = React.useState(window.innerHeight)

  const onNodeClick = React.useCallback(
    (node: Node) => {
      dispatch(selectNodeById(node.id)) 
      console.log(selectedNodes)
    },
    []
  )

  React.useEffect(
    () => {
      console.log(selectedNodes)
    },
    [selectedNodes]
  )

  React.useEffect(
    () => {
      const onResize = () => {
        setGraphWidth(window.innerWidth)
        setGraphHeight(window.innerHeight)
      }

      const transformedEdges = []
      for (const node of nodes) {
        const neighbours = edges.filter((edge) => edge.source.id === node.id)
        for (let i = 0; i < neighbours.length; i++) {
          transformedEdges.push({
            source: neighbours[i].source.id, 
            target: neighbours[i].destination.id, 
            curvature: i * 0.3, 
            rotation: 0
          })
          if (neighbours[i].type === EdgeType.NOT_ORIENTED) {
            transformedEdges.push({
              source: neighbours[i].destination.id, 
              target: neighbours[i].source.id, 
              curvature: i * -0.3, 
              rotation: 0
            })
          }
        }
      }
      setGraphNodes(nodes.map((n) => ({id: n.id, label: n.label})))
      setGraphEdges(transformedEdges)

      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    [nodes, edges]
  )

  return (
    <div id='graph-container' className='w-full h-full'>
      <ForceGraph3D 
        width={graphWidth} 
        height={graphHeight}
        graphData={{
          nodes: graphNodes,
          links: graphEdges,
        }}
        nodeColor={(node: Node) => selectedNodes.includes(node.id) ? 'red' : 'yellow'}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.label);
          sprite.color = 'white';
          sprite.textHeight = 1;
          return sprite;
        }}
        onNodeClick={onNodeClick}
        nodeThreeObjectExtend={true}
        linkCurvature="curvature"
        linkCurveRotation="rotation"
        linkDirectionalParticles={2}
        linkDirectionalArrowLength={2}
        linkDirectionalArrowRelPos={1.05}
      />
    </div>
  );
}

export default Graph;