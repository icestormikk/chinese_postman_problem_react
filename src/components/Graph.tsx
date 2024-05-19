import { useAppSelector } from '@/libs/redux/hooks';
import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { EdgeType } from '@/types/graph/EdgeType';

function Graph() {
  const { edges, nodes } = useAppSelector((state) => state.graph)
  const [graphNodes, setGraphNodes] = React.useState<any[]>([])
  const [graphEdges, setGraphEdges] = React.useState<any[]>([])
  const [edgesPath, setEdgesPath] = React.useState<any[]>([])
  const [graphWidth, setGraphWidth] = React.useState(window.innerWidth)
  const [graphHeight, setGraphHeight] = React.useState(window.innerHeight)

  React.useEffect(
    () => {
      const onResize = () => {
        setGraphWidth(window.innerWidth)
        setGraphHeight(window.innerHeight)
      }

      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    []
  )

  React.useEffect(
    () => {
      const result = []
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        result.push({
          source: edge.source.id,
          target: edge.destination.id,
          curvature: i * 0.3,
          rotation: 0,
        })
        if (edge.type == EdgeType.NOT_ORIENTED) {
          result.push({
            source: edge.destination.id,
            target: edge.source.id,
            curvature: i * -0.3,
            rotation: 0,
          })
        }
      }

      setGraphNodes(nodes.map((n) => ({id: n.id, label: n.label})))
      setGraphEdges(result)
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
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.label);
          sprite.color = 'white';
          sprite.textHeight = 1;
          return sprite;
        }}
        linkColor={(link) => link.color}
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